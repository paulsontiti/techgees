import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { getCoursePurchase } from "../../../../../../actions/getCoursePurchase";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { coursePurchase, error } = await getCoursePurchase(
  courseId,userId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(coursePurchase);
    } catch (err) {
        console.log("[COURSE_PURCHASE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


