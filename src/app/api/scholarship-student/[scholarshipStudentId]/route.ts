import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { scholarshipStudentId } }: { params: { scholarshipStudentId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });

    const values = await req.json();

    const scholarshipStudent = await db.scholarshipStudents.findUnique({
      where: {
      id:scholarshipStudentId,userId
      },
    });
    if (!scholarshipStudent) return new NextResponse("Unauthoried", { status: 401 });

    await db.scholarshipStudents.update({
      where: {
        id: scholarshipStudentId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[SCHOLARSHIP_STUDENT]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

