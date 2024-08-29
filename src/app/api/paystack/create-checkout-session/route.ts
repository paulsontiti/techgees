import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { email, amount } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
    const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
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
  
    
      const {authorizationUrl,access_code,reference} = response.data.data;
      if(reference){
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.PAYSTACK!}`,
              },
            }
          );
        
          
      }

    return NextResponse.json({ authorizationUrl });
  } catch (err) {
    console.log("[PAYSTACK]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
