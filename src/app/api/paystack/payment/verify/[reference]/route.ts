import { NextResponse } from "next/server";
import { paystack } from "@/lib/paystack";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      reference: string;
    }>;
  },
) {
  try {
    const { reference } = await params; 

   await paystack.get(`/transaction/verify/${reference}`);

    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log(err.message);
  }
}


