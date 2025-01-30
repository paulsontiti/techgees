import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { hasStartedACourse } from "../../../../../../actions/hasStartedACourse"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {

        const userId = await getUserCookie()
        if (!userId) return new NextResponse("Unauthoried", { status: 401 })

            const { startedCourse, error } = await hasStartedACourse(userId,courseId)
           if(error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(startedCourse);
    } catch (err) {
        console.log("[STARTED_COURSE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


