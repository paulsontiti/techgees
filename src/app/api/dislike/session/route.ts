import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userId = await getUserCookie();
    const { sessionId } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
    const hasDisLiked = await db.disLike.findFirst({
      where: { userId, sessionId } ,
    });
    if (hasDisLiked) {
      await db.disLike.deleteMany({
        where: {
            userId,
            sessionId,
          },
      });
    } else {
      await db.disLike.create({
        data: {
          userId,
          sessionId,
        },
      });
    }

    return NextResponse.json("");
  } catch (err) {
    console.log("[SESSION_DISLIKE]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
