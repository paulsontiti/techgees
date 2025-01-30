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
            price:true
        }
       })

              return NextResponse.json(course?.price);
    } catch (err) {
        console.log("[COURSE_PRICE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


