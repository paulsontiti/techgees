import { NextResponse } from "next/server"
import { getSessionStudentsCount } from "../../../../../../actions/getSessionStudentsCount";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
           const {numberOfStudents,error} = await getSessionStudentsCount(sessionId);
           if(error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfStudents);
    } catch (err) {
        console.log("[SESSION_STARTED_STUDENTS_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


