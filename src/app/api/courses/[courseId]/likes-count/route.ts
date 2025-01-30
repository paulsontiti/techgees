import { NextResponse } from "next/server"
import { getCourseLikesCount } from "../../../../../../actions/getCourseLikesCount"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const { numberOfLikes, error } = await getCourseLikesCount(
            courseId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfLikes);
    } catch (err) {
        console.log("[COURSE_LIKES_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


