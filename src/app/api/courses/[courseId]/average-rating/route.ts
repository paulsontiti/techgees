import { NextResponse } from "next/server"
import { getCourseRating } from "../../../../../../actions/getCourseRating"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
       const { averageRating, error } = await getCourseRating(
  courseId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(averageRating);
    } catch (err) {
        console.log("[COURSE_AVERAGE_RATING]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


