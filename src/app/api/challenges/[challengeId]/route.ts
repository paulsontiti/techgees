import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { getCourse } from "../../../../../actions/getCourse"


export async function PATCH(
    req: Request,
    { params: { challengeId } }: { params: { challengeId: string } }
) {

    try {

        const userId = await getUserCookie()
        if (!userId) return new NextResponse("Unauthoried", { status: 401 })

        const values = await req.json()
     

        const challenge = await db.challenge.findUnique({
            where: {
                id: challengeId,
                userId

            }
        })
        if (!challenge) return new NextResponse("Unauthoried", { status: 401 })
            //check for start date and end date update
        values.startDate ? values.startDate = new Date(values.startDate) : undefined
        values.endDate ? values.endDate = new Date(values.endDate) : undefined


        await db.challenge.update({
            where: {
                id: challengeId,
                userId

            },
            data: {
                ...values
            }
        })

        return NextResponse.json("")

    } catch (err) {
        console.log("[CHALLENGE_ID]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}


export async function DELETE(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {

        const userId = await getUserCookie()
        if (!userId) return new NextResponse("Unauthoried", { status: 401 })


        const course = await db.course.findUnique({
            where: {

                id: courseId,
                userId

            }
        })
        if (!course) return new NextResponse("Unauthoried", { status: 401 })




        await db.course.delete({
            where: {
                id: courseId
            }

        })


        return NextResponse.json("")

    } catch (err) {
        console.log("[COURSE_CHAPTER_ID_DELETE]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params: { challengeId } }: { params: { challengeId: string } }
) {

    try {
       const challenge = await db.challenge.findUnique({
        where:{
            id:challengeId
        }
       })

        return NextResponse.json(challenge);
    } catch (err) {
        console.log("[GET_CHALLENGE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}
