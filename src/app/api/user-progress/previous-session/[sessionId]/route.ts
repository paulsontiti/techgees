import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request,
    { params: { sessionId} }:
        { params: { sessionId: string } }
) {

    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 })
        }

        const url = new URL(req.url)

        const chapterId = url.searchParams.get("chapterId")

        const session = await db.session.findUnique({
            where: {
                id: sessionId
            }
        })

        //get the previous session position
        const prvPosition = session ? session.position - 1 : 0;

        const previousSession = await db.session.findFirst({
            where: {
                chapterId:chapterId ?? "",
                position: prvPosition
            },
            orderBy: {
                position: "asc"
            }
        })


        const userProgress = await db.userProgress.findFirst({
            where: {
                userId,
                sessionId: previousSession?.id

            }, select: {
                isCompleted: true
            }
        })




        return NextResponse.json(userProgress ? userProgress.isCompleted : false)
    } catch (err) {

        console.log("[GET_PREVIOUS_SESSION_PROGRESS]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}