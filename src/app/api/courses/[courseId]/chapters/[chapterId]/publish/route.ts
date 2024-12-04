import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params: { courseId, chapterId },
  }: { params: { courseId: string; chapterId: string} }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });


    const course = await db.course.findUnique({
      where: {
   
          id: courseId,
          userId
      },
    });
    if (!course) return new NextResponse("Unauthoried", { status: 401 });

    const chapter = await db.chapter.findUnique({
        where: {
          id:chapterId,
          courseId
        },
        include:{sessions:true}
      });
    

      if(!chapter || !chapter.title || !chapter.description || !chapter.sessions.some((session)=>session.isPublished)){
            return  new NextResponse("Missing required fields", { status: 404 });
      }

    await db.chapter.update({
      where: {
        id: chapterId,courseId
      },
      data: {
        isPublished:true,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[CHAPTER_PUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}