import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 })
        }

        const userProgress = await db.userProgress.findFirst({
            where: {
                userId,
                sessionId

            }, select: {
                isCompleted: true
            }
        })




        return NextResponse.json(userProgress)
    } catch (err) {

        console.log("[GET_USER_SESSION_PROGRESS]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}