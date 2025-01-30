import { NextResponse } from "next/server"
import { db } from "@/lib/db";


export async function GET(
    req: Request,
    { params: { sessionId } }: { params: { sessionId: string } }
) {


    try {
        const assignments = await db.assignment.findMany({
            where: {
                sessionId
            }
        })
        return NextResponse.json(assignments);
    } catch (err) {
        console.log("[SESSION_ASSIGNMENTS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


