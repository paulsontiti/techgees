import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { hasRatedCourse } from "../../../../../../actions/hasRatedCourse";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
        const { hasRated, error } = await hasRatedCourse(
            courseId,userId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasRated);
    } catch (err) {
        console.log("[HAS_RATED_COURSE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


