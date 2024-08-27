import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { sessionId } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
    const hasLiked = await db.like.findUnique({
      where: { userId_sessionId: { userId, sessionId } },
    });
    if (hasLiked) {
      await db.like.delete({
        where: {
          userId_sessionId: {
            userId,
            sessionId,
          },
        },
      });
    } else {
      await db.like.create({
        data: {
          userId,
          sessionId,
        },
      });
    }

    return NextResponse.json("");
  } catch (err) {
    console.log("[SESSION_LIKE]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
