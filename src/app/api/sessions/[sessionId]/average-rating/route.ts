import { NextResponse } from "next/server"
import { getSessionRating } from "../../../../../../actions/getSessionRating";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
       const { averageRating, error } = await getSessionRating(
  sessionId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(averageRating);
    } catch (err) {
        console.log("[SESSION_AVERAGE_RATING]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


