import { NextResponse } from "next/server"
import { getCourseCategoriesByCourseId } from "../../../../../../actions/getCourseCategoriesByCourseId";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
       const { categories } = await getCourseCategoriesByCourseId(courseId);

        return NextResponse.json(categories);
    } catch (err) {
        console.log("[COURSE_CATEGORIES]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


