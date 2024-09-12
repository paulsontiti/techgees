import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(
    req: Request,
    { params: { categoryId } }: { params: { categoryId: string } }
) {

    try {

        const courseCategories = await db.courseCategory.findMany({
            where: {
                categoryId,
            },
        });

        const courseIds = courseCategories.map((cat) => cat.courseId);

        const courses = await db.course.findMany({
            where: {
                id: {
                    in: courseIds
                },
            },include:{
                chapters:true
            }
        })
        return NextResponse.json(courses)

    } catch (err) {
        console.log("[COURSES_BY_CATEGORYID]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}


