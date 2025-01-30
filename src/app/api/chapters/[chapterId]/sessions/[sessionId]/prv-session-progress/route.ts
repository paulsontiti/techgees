import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { getSessionProgress } from "../../../../../../../../actions/getSessionProgress";
import { getUserCookie } from "@/lib/get-user-cookie";


export async function GET(
    req: Request,
    { params: { sessionId,chapterId } }: { params: { sessionId: string,chapterId:string } }
) {

    
    try {
        const userId = await getUserCookie();
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

         const {sessionProgress}  = await getSessionProgress(previousSession?.id || "",userId || ""); 

        return NextResponse.json(sessionProgress);
    } catch (err) {
        console.log("[GET_PRV_SESSION_PROGRESS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


