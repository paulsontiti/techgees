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

         //get the previous session position
         const prvPosition = session ? session.position - 1 : 0;

         const previousSession = await db.session.findFirst({
             where: {
                 chapterId,
                 isPublished: true,
                 position: prvPosition
             },
             orderBy: {
                 position: "asc"
             }
         })
        return NextResponse.json(previousSession);
    } catch (err) {
        console.log("[GET_PRV_SESSION]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


