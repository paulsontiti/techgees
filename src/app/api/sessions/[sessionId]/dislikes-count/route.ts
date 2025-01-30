import { NextResponse } from "next/server"
import { getSessionDisLikesCount } from "../../../../../../actions/getSessionDisLikesCount";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const { numberOfDisLikes, error } = await getSessionDisLikesCount(
            sessionId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfDisLikes);
    } catch (err) {
        console.log("[SESSION_DISLIKES_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


