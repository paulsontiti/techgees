import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { hasDisLikedSession } from "../../../../../../actions/hasDisLikedSession";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const userId = await getUserCookie();
        if (!userId) return new NextResponse("Unauthorised", { status: 401 });
        const { hasDisLiked, error } = await hasDisLikedSession(
            sessionId, userId
        );

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasDisLiked);
    } catch (err) {
        console.log("[HAS_DISLIKED_SESSION]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


