import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { courseId } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
    const hasLiked = await db.disLike.findFirst({
      where: { userId,courseId },
    });
    if (hasLiked) {
      await db.disLike.deleteMany({
        where: {          
            userId,
            courseId,
          
        },
      });
    } else {
      await db.disLike.create({
        data: {
          userId,
          courseId,
        },
      });
    }

    return NextResponse.json("");
  } catch (err) {
    console.log("[COURSE_DISLIKE]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
