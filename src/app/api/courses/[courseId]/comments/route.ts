import { NextResponse } from "next/server"
import { getCourseComments } from "../../../../../../actions/getCourseComments";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const { comments} = await getCourseComments(
            courseId
        );
        
        return NextResponse.json(comments);
    } catch (err) {
        console.log("[COURSE_COMMENTS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


