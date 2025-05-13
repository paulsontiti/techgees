import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { scholarshipId } }: { params: { scholarshipId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });

    const values = await req.json();

    const scholarship = await db.scholarship.findUnique({
      where: {
        id: scholarshipId,
        authorId: userId,
      },
    });
    if (!scholarship) return new NextResponse("Unauthoried", { status: 401 });

    await db.scholarship.update({
      where: {
        id: scholarshipId,
        authorId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[SCHOLARSHIP]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params: { scholarshipId } }: { params: { scholarshipId: string } }
) {
  try {
    const payments = await db.paystackPayment.findMany({
      where: {
        scholarshipId,
        payment_status: "success",
      },
      select: {
        userId: true,
      },
    });

    const userIds = payments.map(payment => payment.userId);

    const students = await db.dBUser.findMany({
      where:{
        userId: {
          in: userIds
        }
      }
    })

    return NextResponse.json(students);
  } catch (err) {
    console.log("[GET_SCHOLARSHIP_STUDENTS]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
