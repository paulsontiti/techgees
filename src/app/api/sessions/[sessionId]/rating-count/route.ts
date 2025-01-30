import { NextResponse } from "next/server"
import { getSessionNumberOfRatings } from "../../../../../../actions/getSessionNumberOfRatings";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
       const { numberOfRatings, error } = await getSessionNumberOfRatings(
  sessionId
);
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfRatings);
    } catch (err) {
        console.log("[SESSION_RATING_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


