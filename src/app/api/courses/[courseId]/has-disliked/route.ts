import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { hasDisLikedCourse } from "../../../../../../actions/hasDisLikedCourse";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
        const { hasDisLiked, error } = await hasDisLikedCourse(
            courseId,userId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasDisLiked);
    } catch (err) {
        console.log("[HAS_DISLIKED_COURSE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


