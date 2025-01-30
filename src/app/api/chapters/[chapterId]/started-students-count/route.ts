import { NextResponse } from "next/server"
import { getNumberOfStudentsStartedAChapter } from "../../../../../../actions/getNumberOfStudentsStartedAChapter";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
           const {numberOfStudents,error} = await getNumberOfStudentsStartedAChapter(chapterId);
           if(error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfStudents);
    } catch (err) {
        console.log("[CHAPTER_STARTED_STUDENTS_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


