import { NextResponse } from "next/server"
import { getCourseNumberOfChapters } from "../../../../../../actions/getCourseNumberOfChapters ";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
   
        const { numberOfChapters } = await getCourseNumberOfChapters(courseId);


        return NextResponse.json(numberOfChapters);
    } catch (err) {
        console.log("[COURSE_NUMBER_OF_CHAPTERS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


