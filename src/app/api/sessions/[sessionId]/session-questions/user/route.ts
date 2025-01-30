import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";


export async function GET(req: Request, {
  params: { sessionId }
}: {
  params: { sessionId: string }
}) {
  try {
   const userId = await getUserCookie();
   if(!userId) return new NextResponse("Unauthorised", {
    status: 401,
  });
    const questions = await db.sessionQuestion.findMany({
      where: {
        sessionId,
        userId
      }
    })

    return NextResponse.json(questions);
  } catch (err) {
    console.log("[GET_USER_SESSION_ASKED_QUESTIONS]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}