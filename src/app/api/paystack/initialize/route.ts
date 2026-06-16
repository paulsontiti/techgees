// app/api/payments/initialize/route.ts

import { NextResponse } from "next/server";
import { paystack } from "@/lib/paystack";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";

export async function POST(req: Request) {
  const body = await req.json();
   const userId = await getUserCookie();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

  const { email, amount,courseId,purchaseType } = body;

  const reference = randomUUID();

  await db.paystackPayment.create({
    data: {
      reference,
      amount,
      userId,courseId,purchaseType
    },
  });

  const response =
    await paystack.post(
      "/transaction/initialize",
      {
        email,
        amount: amount * 100,
        reference,
        callback_url:`${process.env.WEB_URL}/payment/success`,
      }
    );

  return NextResponse.json(
    response.data.data
  );
}