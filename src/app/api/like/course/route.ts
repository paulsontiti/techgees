import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await getUserCookie();
    const { courseId } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
    const hasLiked = await db.like.findFirst({
      where: { userId,courseId },
    });
    if (hasLiked) {
      await db.like.deleteMany({
        where: {          
            userId,
            courseId,
          
        },
      });
    } else {
      await db.like.create({
        data: {
          userId,
          courseId,
        },
      });
    }

    return NextResponse.json("");
  } catch (err) {
    console.log("[COURSE_LIKE]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
