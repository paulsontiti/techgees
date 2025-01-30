import { NextResponse } from "next/server"
import { hasLikedCourse } from "../../../../../../actions/hasLikedCourse";
import { getUserCookie } from "@/lib/get-user-cookie";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
        const { hasLiked, error } = await hasLikedCourse(
            courseId,userId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasLiked);
    } catch (err) {
        console.log("[HAS_LIKED_COURSE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


