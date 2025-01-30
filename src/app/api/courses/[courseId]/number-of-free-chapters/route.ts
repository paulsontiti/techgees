import { NextResponse } from "next/server"
import { getCourseNumberOfFreeChapters } from "../../../../../../actions/getCourseNumberOfFreeChapters";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
   
        const { numberOfFreeChapters } = await getCourseNumberOfFreeChapters(courseId);


        return NextResponse.json(numberOfFreeChapters);
    } catch (err) {
        console.log("[COURSE_NUMBER_OF_FREE_CHAPTERS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


