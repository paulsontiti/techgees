import { NextResponse } from "next/server"
import { getCourseProgress } from "../../../../../../actions/getCourseProgress";
import { getUserCookie } from "@/lib/get-user-cookie";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("unauthorised", { status: 401 });
       const { progressPercentage, error } = await getCourseProgress(userId,
  courseId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(progressPercentage);
    } catch (err) {
        console.log("[COURSE_AVERAGE_RATING]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


