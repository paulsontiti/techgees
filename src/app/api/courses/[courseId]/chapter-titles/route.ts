import { NextResponse } from "next/server"
import { getCourseRating } from "../../../../../../actions/getCourseRating"
import { getCourseChaptersTitle } from "../../../../../../actions/getCourseChaptersTitle";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
       const { chapterTitles, error } = await getCourseChaptersTitle(
  courseId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(chapterTitles);
    } catch (err) {
        console.log("[COURSE_CHAPTER_TITLES]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


