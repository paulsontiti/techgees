import { NextResponse } from "next/server"
import { getCourseCommentsCount } from "../../../../../../actions/getCourseCommentsCount"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const { numberOfComments, error } = await getCourseCommentsCount(
            courseId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfComments);
    } catch (err) {
        console.log("[COURSE_COMMENTS_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


