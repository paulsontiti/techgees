import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { creditReferrers } from "../../../../../actions/creditReferrers";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     //validate event
//     const hash = crypto
//       .createHmac("sha512", process.env.PAYSTACK!)
//       .update(JSON.stringify(req.body))
//       .digest("hex");
//     if (hash == req.headers.get("x-paystack-signature")) {
//       // Retrieve the request's body
//       const { event, data } = body;

//       // Do something with event
//       if (event === "charge.success") {
//         const { status, amount, reference } = data;

//         const payStackPayment = await db.paystackPayment.findUnique({
//           where: {
//             reference,
//           }
//         });

//         if (!!payStackPayment) {
//           //update paystack payment status
//           await db.paystackPayment.update({
//             where: {
//               reference,
//             },
//             data: {
//               payment_status: status,
//               amount,
//             },
//           });

//         }
//       }
//     }

//     return NextResponse.json("", { status: 200 });
//   } catch (err) {
//     console.log("[PAYSTACK_WEBHOOK]", err);
//     return new NextResponse("Internal Error", {
//       status: 500,
//     });
//   }
// }

// app/api/payments/webhook/route.ts

type CourseType = {
  price: number | null;
  subscriptionPrice: number | null;
  maxSubscriptionChapters: number;
} | null;

export async function POST(request: NextRequest) {
  const body = await request.text();

  const signature = request.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new Response("Invalid signature", {
      status: 401,
    });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    // console.log(event)

    const reference = event.data.reference;
    const amount = event.data.amount / 100;
    const paystackPayment = await db.paystackPayment.findUnique({
      where: {
        reference,
      },
    });
    let userId = "";
    let purchaseType = "";
    let courseId = "";

    userId = paystackPayment ? paystackPayment.userId : "";
    purchaseType = paystackPayment ? paystackPayment.purchaseType : "";
    courseId = paystackPayment ? (paystackPayment.courseId as string) : "";

    await db.paystackPayment.update({
      where: {
        reference,
      },
      data: {
        payment_status: "success",
        paidAt: new Date(),
      },
    });

    await createPurchaseOrSubscription(userId, courseId, purchaseType);

    await creditReferrers(reference, amount);

    // const reference = event.data.reference;

    // await db.paystackPayment.update({
    //   where: {
    //     reference,
    //   },
    //   data: {
    //     payment_status: "success",
    //     paidAt: new Date(),
    //   },
    // });
  }

  return NextResponse.json({
    success: true,
  });
}


async function createSubscription(
  userId: string,
  courseId: string,
  course: CourseType,
) {
  const subscription = await db.subscription.findFirst({
    where: {
      userId,
      courseId,
      expiringDate: {
        gt: new Date(),
      },
    },
  });
  if (!subscription) {
    await db.subscription.create({
      data: {
        price: course?.subscriptionPrice || 10000,
        courseId,
        userId,
        expiringDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }
}

async function createPurchase(
  userId: string,
  courseId: string,
  course: CourseType,
) {
  const purchase = await db.purchase.findUnique({
    where: {
      courseId_userId: {
        userId,
        courseId,
      },
    },
  });

  if (!purchase) {
    await db.purchase.create({
      data: {
        price: course?.price ?? 0,
        courseId,
        userId,
      },
    });
  }
}

async function createPurchaseOrSubscription(
  userId: string,
  courseId: string,
  purchaseType: string,
) {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      price: true,
      subscriptionPrice: true,
      maxSubscriptionChapters: true,
    },
  });

  if (purchaseType === "OneTime") {
    await createPurchase(userId, courseId, course);
  } else {
    await createSubscription(userId, courseId, course);
  }
}