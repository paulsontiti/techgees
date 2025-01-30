import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { getCourseChaptersUserProgress } from "../../../../../../actions/getCourseChaptersUserProgress";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie() || "";
        const { course, error } = await getCourseChaptersUserProgress(
            userId,
            courseId
        );

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(course);
    } catch (err) {
        console.log("[COURSE_CHAPTER_USERPROGRESS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


