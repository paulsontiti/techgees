import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params: { courseId,childCourseId } }: { params: { courseId: string,childCourseId:string } }
) {

    try {
        const userId = await getUserCookie();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId

            }
        })
        if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 })

      

        await db.courseChild.delete({
            where: {
                childCourseId_parentCourseId: {
                    childCourseId, parentCourseId:courseId
                }
            }
        })

        return NextResponse.json("")
    } catch (err) {
        console.log("[DELETE_CHILD_COURSE]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}