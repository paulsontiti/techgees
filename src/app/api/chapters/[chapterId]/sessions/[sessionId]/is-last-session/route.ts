import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { isTheLastSession } from "../../../../../../../../actions/isTheLastSession";


export async function GET(
    req: Request,
    { params: { sessionId,chapterId } }: { params: { sessionId: string,chapterId:string } }
) {

    try {
        const session = await db.session.findUnique({
            where:{
                id:sessionId
            },select:{
                position:true
            }
        });

       const { isLastSession } = await isTheLastSession(
  chapterId,session?.position || 0
);

        return NextResponse.json(isLastSession);
    } catch (err) {
        console.log("[IS_LAST_SESSION]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


