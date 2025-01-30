import { NextResponse } from "next/server"
import { db } from "@/lib/db";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {


    try {
        const attatchments = await db.attachment.findMany({
            where: {
                sessionId
            }
        })
        return NextResponse.json(attatchments);
    } catch (err) {
        console.log("[SESSION_ATTATCHMENTS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


