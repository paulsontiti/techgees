import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { db } from "@/lib/db";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const questions = await db.question.findMany({
        where:{
            sessionId
        }
       }
);
        return NextResponse.json(questions);
    } catch (err) {
        console.log("[SESSION_QUESTIONS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


