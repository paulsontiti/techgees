import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userId = await getUserCookie();
    const { chapterId } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
    const hasDisLiked = await db.disLike.findFirst({
      where: {  userId, chapterId } ,
    });
    if (hasDisLiked) {
      await db.disLike.deleteMany({
        where: {
            userId,
            chapterId,
          },
      });
    } else {
      await db.disLike.create({
        data: {
          userId,
          chapterId,
        },
      });
    }

    return NextResponse.json("");
  } catch (err) {
    console.log("[CHAPTER_DISLIKE]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
