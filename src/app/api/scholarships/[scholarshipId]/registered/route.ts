import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { scholarshipId } }: { params: { scholarshipId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    const scholarship = await db.paystackPayment.findFirst({
      where: {
       userId,
       scholarshipId,
       payment_status:"success"
      },
    });

    return NextResponse.json(scholarship ? true : false);
  } catch (err) {
    console.log("[IS_REGISTERED_SCHOLARSHIP]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
