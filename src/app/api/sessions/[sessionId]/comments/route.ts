import { NextResponse } from "next/server"
import { getSessionComments } from "../../../../../../actions/getSessionComments";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const { comments, error } = await getSessionComments(
            sessionId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(comments);
    } catch (err) {
        console.log("[SESSION_COMMENTS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


