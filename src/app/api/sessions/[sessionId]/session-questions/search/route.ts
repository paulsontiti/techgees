import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request, {
  params: { sessionId }
}: {
  params: { sessionId: string }
}) {
  try {
    const { searchValue } = await req.json();
    const questions = await db.sessionQuestion.findMany({
      where: {
        sessionId,
        question: {
          contains: searchValue
        }
      }
    })

    return NextResponse.json(questions);
  } catch (err) {
    console.log("[GET_SESSION_ASK_QUESTION]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}