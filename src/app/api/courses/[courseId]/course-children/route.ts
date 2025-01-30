import { NextResponse } from "next/server"
import { getCourseChildren } from "../../../../../../actions/getCourseChildren";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
       const { courseChildren, error } = await getCourseChildren(
  courseId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(courseChildren);
    } catch (err) {
        console.log("[COURSE_CHILDREN]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


