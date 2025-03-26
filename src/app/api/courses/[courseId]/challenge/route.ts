import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const challenge = await db.challenge.findFirst({
            where: {
                courseId,
                endDate: { gte: new Date() }

            }
        })
       

        return NextResponse.json(challenge)
    } catch (err) {
        console.log("[COURSE_CHALLENGE]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}