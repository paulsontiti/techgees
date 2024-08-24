import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params: { courseId, chapterId, sessionId },
  }: { params: { courseId: string; chapterId: string; sessionId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });


    const course = await db.course.findUnique({
      where: {
          id: courseId,
          userId,
        
      },
    });
    if (!course) return new NextResponse("Unauthoried", { status: 401 });

    const session = await db.session.findUnique({
        where: {
          id:sessionId,
          chapterId
        },
      });
    
      if (!session) return new NextResponse("Unauthoried", { status: 401 });
     
    await db.session.update({
      where: {
        id: sessionId,chapterId
      },
      data: {
        isPublished:false,
      },
    });

    const publishedSessionsInChapter = await db.session.findMany({
      where:{
          chapterId,
          isPublished:true
      }
  })

  if(!publishedSessionsInChapter.length){
      await db.chapter.update({
          where:{
              id:chapterId
          },
          data:{
              isPublished:false
          }
      })
  }

    return NextResponse.json("");
  } catch (err) {
    console.log("[SESSION_PUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}