import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    
    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
        //et chapter
        const chapter = await db.chapter.findUnique({
            where:{
                id:chapterId
            },
            include:{
                sessions:true
            }
          })
    
          const lastSession = chapter?.sessions ?
           chapter?.sessions[chapter.sessions.length - 1] : null;

           if(!lastSession) return NextResponse.json(false);
        const userProgress = await db.userProgress.findFirst({
            where: {
      
              userId,sessionId:lastSession.id
            },select:{
                isCompleted:true
            }

          });
        return NextResponse.json(!!userProgress);
    } catch (err) {
        console.log("[IS_CHAPTER_COMPLETED]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


