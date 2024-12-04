import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {
        const { userId } = await getUserCookie()
        const { chapterId, score } = await req.json()

        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 })
        }

        await db.chapterTestScore.create({
            data: {
                userId,
                score,
                chapterId
            }
        })

        if (score > 6) {
            await db.userProgress.create({
                data: {
                    chapterId,
                    isCompleted: true,
                    userId
                }
            })



        }




        return NextResponse.json('')
    } catch (err) {

        console.log("[CHAPTER_TEST]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}