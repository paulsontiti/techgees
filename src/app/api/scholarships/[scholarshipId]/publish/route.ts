import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params: { scholarshipId },
  }: { params: { scholarshipId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });


    const scholarship = await db.scholarship.findUnique({
      where: {
        id: scholarshipId,
        authorId:userId,

      }
    });



    if (!scholarship || !scholarship.title || !scholarship.description || !scholarship.imageUrl ||
      !scholarship.subTitle || !scholarship.price
    ) {
      return new NextResponse("Missing required fields", { status: 404 });
    }

    await db.scholarship.update({
      where: {
        id: scholarshipId
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[SCHOLARSHIP_PUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}