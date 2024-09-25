import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request,
    {
        params: { assignmentAnswerId }
    }: {
        params: { assignmentAnswerId: string }
    }
) {
    try {
        const { userId } = auth();
        const { remark } = await req.json();

        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 });
        }

         await db.assignmentAnswerRemarks.create({
            data: {
               assignmentAnswerId,
               remark,
               userId
            }
        })

            return NextResponse.json("");
    } catch (err) {
        console.log("[ASSIGNMENT_ANSWER_REMARK]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
