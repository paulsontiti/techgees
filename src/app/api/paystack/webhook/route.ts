import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
  console.log(body)

    return NextResponse.json({  });
  } catch (err) {
    console.log("[PAYSTACK_WEBHOOK]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
