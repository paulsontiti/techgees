import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    //validate event
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK!)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers.get("x-paystack-signature")) {
      // Retrieve the request's body
      const { event, data } = body;

      // Do something with event
      if (event === "charge.success") {
        const { status, amount, reference } = data;

        const payStackPayment = await db.paystackPayment.findUnique({
          where: {
            reference,
          },
          include: {
            course: true,
          },
        });

        if (!!payStackPayment) {
          //update paystack payment status
          await db.paystackPayment.update({
            where: {
              reference,
            },
            data: {
              payment_status: status,
              amount,
            },
          });

          const { userId, course, courseId } = payStackPayment;
          const price = course?.price ?? 0;
          let percentage = 0;

          const purchase = await db.purchase.findUnique({
            where: {
              userId_courseId: {
                userId,
                courseId,
              },
            },
          });

          if (purchase) {
            percentage = (amount / price) * 100 + purchase.percentage;
            await db.purchase.update({
              where: {
                userId_courseId: {
                  userId,
                  courseId,
                },
              },
              data: {
                percentage,
              },
            });
          } else {
            percentage = (amount / price) * 100;
            await db.purchase.create({
              data: {
                percentage,
                userId,
                courseId,
              },
            });
          }
        }
      }
    }

    return NextResponse.json("", { status: 200 });
  } catch (err) {
    console.log("[PAYSTACK_WEBHOOK]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
