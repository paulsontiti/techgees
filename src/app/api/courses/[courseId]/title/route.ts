import { NextResponse } from "next/server"
import { db } from "@/lib/db";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
       const course = await db.course.findUnique({
        where:{
            id:courseId
        },select:{
            title:true
        }
       })

              return NextResponse.json(course?.title);
    } catch (err) {
        console.log("[COURSE_TITLE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


