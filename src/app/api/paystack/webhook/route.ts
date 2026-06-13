import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

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

export async function POST(request: Request) {
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
    const reference = event.data.reference;

    await db.paystackPayment.update({
      where: {
        reference,
      },
      data: {
        payment_status: "success",
        paidAt: new Date(),
      },
    });
  }

  return NextResponse.json({
    success: true,
  });
}
