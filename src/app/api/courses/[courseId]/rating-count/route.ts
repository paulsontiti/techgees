import { NextResponse } from "next/server"
import { getCourseNumberOfRatings } from "../../../../../../actions/getCourseNumberOfRatings"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
       const { numberOfRatings, error } = await getCourseNumberOfRatings(
  courseId
);
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfRatings);
    } catch (err) {
        console.log("[COURSE_RATING_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


