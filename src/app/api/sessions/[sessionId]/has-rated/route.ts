import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { hasRatedSession } from "../../../../../../actions/hasRatedSession";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { hasRated, error } = await hasRatedSession(
  sessionId,userId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasRated);
    } catch (err) {
        console.log("[HAS_RATED_SESSION]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


