import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    {
        params: { assignmentId }
    }: {
        params: { assignmentId: string }
    }
) {
    try {
        const userId = await getUserCookie();
        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 });
        }

        const ans = await db.assignmentAnswer.findUnique({
            where: {
                userId_assignmentId: {
                    userId, assignmentId
                }
            }
        })

       

        return NextResponse.json(ans);
    } catch (err) {
        console.log("[GET_ASSIGNMENT_ANSWER]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}


