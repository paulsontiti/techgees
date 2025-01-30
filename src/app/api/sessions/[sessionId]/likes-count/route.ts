import { NextResponse } from "next/server"
import { getSessionLikesCount } from "../../../../../../actions/getSessionLikesCount";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const { numberOfLikes, error } = await getSessionLikesCount(
            sessionId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfLikes);
    } catch (err) {
        console.log("[SESSION_LIKES_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


