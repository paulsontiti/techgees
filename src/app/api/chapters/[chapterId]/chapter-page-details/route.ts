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
      
          const chapter = await db.chapter.findUnique({
            where: {
              id: chapterId,
              //isPublished: true,
            }, include: {
              sessions: true,
              questions: true,
              assignments: true,
              chapterProjects:{
                include:{
                  chapterProjectSessions:true
                }
              }
            }
          });
      
          if (!chapter)  return new NextResponse("Chapter not available", { status: 500 });
      
           
          const userProgress = await db.userProgress.findFirst({
            where: {
      
              userId,
              chapterId,
            },
          });

        return NextResponse.json({
            chapter,
            userProgress,
          });
    } catch (err) {
        console.log("[GET_CHAPTER_PAGE_DETAILS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


