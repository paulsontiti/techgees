import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const userId = await getUserCookie();
    const { email, amount, courseId } = await req.json();

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

    if (reference) {

        const purchase = await db.purchase.findUnique({
          where:{
            courseId_userId:{
              userId,courseId
            }
          }
        })
    
        if(!purchase){
          const course =  await db.course.findUnique({
            where:{
              id:courseId
            },select:{
              price:true
            }
          })
          await db.purchase.create({
            data:{
              price:course?.price ?? 0,
              courseId,
              userId
            }
          })
        }

        await db.paystackPayment.create({
          data: {
            reference,
            userId,
            courseId,
            amount,
          },
        });
        
        // const {
        //   verifiedPayment: { data },
        //   error,
        // } = await verifyPayStackPayment(reference);
        // if (error) throw new Error(error.message);
  
        // const { status } = data;
        // if (status === "success") {

        //     await db.paystackPayment.create({
        //     data:{
        //       userId,
        //       courseId,
        //       reference,
        //       payment_status:status,
        //       amount
        //     }
        //    })
  
           
        // } else {
         
      //   }
    }

   

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
