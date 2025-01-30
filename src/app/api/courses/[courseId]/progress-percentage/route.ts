import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { getCourseProgress } from "../../../../../../actions/getCourseProgress";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { progressPercentage } = await getCourseProgress(
  userId,courseId
);
        return NextResponse.json(progressPercentage);
    } catch (err) {
        console.log("[COURSE_PURCHASE_PERCENTAGE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


