import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { getSessionProgress } from "../../../../../../actions/getSessionProgress";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { sessionProgress, error } = await getSessionProgress(
  sessionId,userId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(sessionProgress);
    } catch (err) {
        console.log("[HAS_RATED_SESSION]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


