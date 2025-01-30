import { NextResponse } from "next/server"
import { db } from "@/lib/db";


export async function GET(
    req: Request,
    { params: { sessionId,chapterId } }: { params: { sessionId: string,chapterId:string } }
) {

    
    try {
        const session = await db.session.findUnique({
            where:{
                id:sessionId
            }
        })

        const nextSession = await db.session.findFirst({
            where: {
                chapterId,
                isPublished: true,
                position: {
                    gt: session?.position
                }
            },
            orderBy: {
                position: "asc"
            }
        })
        return NextResponse.json(nextSession);
    } catch (err) {
        console.log("[GET_NEXT_SESSION]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


