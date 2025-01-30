import { NextResponse } from "next/server"
import { getCourseDisLikesCount } from "../../../../../../actions/getCourseDisLikesCount"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const { numberOfDisLikes, error } = await getCourseDisLikesCount(
            courseId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfDisLikes);
    } catch (err) {
        console.log("[COURSE_DISLIKES_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


