import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request,
    {
        params: { questionId }
    }: {
        params: { questionId: string }
    }
) {
    try {
        const userId = await getUserCookie();
        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 });
        }

        const {answer} = await req.json();
       const question = await db.sessionQuestion.update({
            where: {
               id:questionId
            },data:{
                answer
            }
        })

       await db.notification.create({
        data:{
            receiverId:question.userId,
            title:"Answer to your question is available",
            message:`Answer to your question "${question.question}" is available`,
            senderId:userId
        }
       })

        return NextResponse.json("");
    } catch (err) {
        console.log("[ANSWER_SESSION_QUESTION]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}


