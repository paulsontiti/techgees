import { NextResponse } from "next/server"
import { db } from "@/lib/db";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {


    try {
        const session = await db.session.findUnique({
            where: {
                id:sessionId
            }
        })
        return NextResponse.json(session);
    } catch (err) {
        console.log("[GET_SESSION]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


