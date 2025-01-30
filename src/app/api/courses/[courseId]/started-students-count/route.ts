import { NextResponse } from "next/server"
import { getNumberOfStudentsStartedACourse } from "../../../../../../actions/getNumberOfStudentsStartedACourse"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
           const {numberOfStudents,error} = await getNumberOfStudentsStartedACourse(courseId);
           if(error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfStudents);
    } catch (err) {
        console.log("[COURSE_STARTED_STUDENTS_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


