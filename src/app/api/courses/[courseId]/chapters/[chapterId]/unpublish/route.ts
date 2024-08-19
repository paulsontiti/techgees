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
        id_userId: {
          id: courseId,
          userId,
        },
      },
    });
    if (!course) return new NextResponse("Unauthoried", { status: 401 });

    const chapter = await db.chapter.findUnique({
        where: {
          id:chapterId,
          courseId
        },
      });
    
      if (!chapter) return new NextResponse("Unauthoried", { status: 401 });
     
    await db.chapter.update({
      where: {
        id: chapterId,courseId
      },
      data: {
        isPublished:false,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where:{
          
          courseId,
          isPublished:true
      }
  })

  if(!publishedChaptersInCourse.length){
      await db.course.update({
          where:{
              id:courseId
          },
          data:{
              isPublished:false
          }
      })
  }

    return NextResponse.json("");
  } catch (err) {
    console.log("[CHAPTER_PUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}