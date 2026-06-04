import { NextResponse } from "next/server";
import { verifyPayStackPayment } from "../../../../../../../actions/verifyPayment";
import { creditReferrers } from "../../../../../../../actions/creditReferrers";
import { db } from "@/lib/db";

type CourseType = {
  price: number | null;
  subscriptionPrice: number | null;
  maxSubscriptionChapters: number;
} | null;

export async function POST(
  req: Request,
  {
    params: { reference }
  }: {
    params: { reference: string }
  },
) {
  try {
    const {userId,purchaseType,courseId} = await req.json();
    const { verifiedPayment } = await verifyPayStackPayment(reference);
    let payment = null;

    if (verifiedPayment) {
      const verifiedAmount = verifiedPayment.data.amount / 100;
      const status = verifiedPayment.data.status;

      payment = {
        amount: verifiedAmount,
        status,
      };

      if (status === "success") {
        // const paystack = await db.paystackPayment.update({
        //   where: {
        //     reference,
        //   },
        //   data: {
        //     payment_status: status,
        //   },
        // });

        await db.paystackPayment.create({
          data: {
            reference,
            userId,
            courseId,
            amount: verifiedAmount,
            purchaseType,payment_status: status,
          },
        });

        await createPurchaseOrSubscription(userId, courseId, purchaseType);

        await creditReferrers(reference, verifiedAmount);
      }
    }

    return NextResponse.json(payment);
  } catch (err) {
    console.log("[VERIFY_PAYMENT]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

async function createSubscription(
  userId: string,
  courseId: string,
  course: CourseType,
) {
  //  const subscription = await db.subscription.findUnique({
  //           where: {
  //             courseId_userId: {
  //               userId,
  //               courseId,
  //             },
  //           },
  //         });
  // if (subscription) {
  //   await db.subscription.update({
  //     where: {
  //       id: subscription.id,
  //     },
  //     data: {
  //     price: course?.subscriptionPrice || 10000,
  //     courseId,
  //     userId,
  //     maxSessions: course?.maxSubscriptionSessions || 30,
  //     expiringDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  //   },
  //   });
  // } else {
  await db.subscription.create({
    data: {
      price: course?.subscriptionPrice || 10000,
      courseId,
      userId,
      maxChapters: course?.maxSubscriptionChapters || 30,
      expiringDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });
}

async function createPurchase(
  userId: string,
  courseId: string,
  course: CourseType,
) {
  // const purchase = await db.purchase.findUnique({
  //       where: {
  //         courseId_userId: {
  //           userId,
  //           courseId,
  //         },
  //       },
  //     });

  //     if (purchase) {
  //       await db.purchase.update({
  //         where: {
  //           id: purchase.id,
  //         },
  //         data: {
  //           price: course?.price ?? 0,
  //           courseId,
  //           userId,
  //         },
  //       });
  //     } else {
  await db.purchase.create({
    data: {
      price: course?.price ?? 0,
      courseId,
      userId,
    },
  });
  //}
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
