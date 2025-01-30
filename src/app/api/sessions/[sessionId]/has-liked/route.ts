import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { hasLikedChapter } from "../../../../../../actions/hasLikedChapter";
import { hasLikedSession } from "../../../../../../actions/hasLikedSession";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { hasLiked, error } = await hasLikedSession(
  sessionId,userId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasLiked);
    } catch (err) {
        console.log("[HAS_LIKED_SESSION]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


