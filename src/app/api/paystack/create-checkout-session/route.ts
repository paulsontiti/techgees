import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";
import { verifyPayStackPayment } from "../../../../../actions/verifyPayment";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { email, amount, courseId, chapterId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email,
        amount: amount * 100, // Paystack amount is in kobo
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK!}`,
        },
      }
    );

    const { authorization_url, reference } = response.data.data;

    setTimeout(async()=>{
      if (reference) {
        const {
          verifiedPayment: { data },
          error,
        } = await verifyPayStackPayment(reference);
        if (error) throw new Error(error.message);
  
        const { status } = data;
        if (status === "success") {
            await db.paystackPayment.create({
            data:{
              userId,
              courseId,
              reference,
              payment_status:status,
              amount
            }
           })
  
            const course = await db.course.findUnique({
              where:{
                id:courseId
              },select:{price:true}
            })
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
        } else {
          await db.paystackPayment.create({
            data: {
              reference,
              userId,
              courseId,
              payment_status: "",
              amount,
            },
          });
        }
      
    },10000)

   

    return NextResponse.json({
      authorizationUrl: authorization_url,
      reference,
    });
  } catch (err) {
    console.log("[PAYSTACK_CHECKOUT_SESSION]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
