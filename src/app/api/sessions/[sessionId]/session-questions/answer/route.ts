import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request, {
    params: { sessionId }
}: {
    params: { sessionId: string}
}) {
    try {
        const {question} = await req.json();
        const sessionQuestion = await db.sessionQuestion.findFirst({
            where: {
                sessionId,
                question
            }, 
            select: {
                answer: true,
            }
            })
        return NextResponse.json(sessionQuestion?.answer ?? null);
    } catch (err) {
        console.log("[GET_SESSION_QUESTION_ANSWER]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}