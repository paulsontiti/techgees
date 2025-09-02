import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";
import { isCourseOwner } from "../../../../../../../../../../actions/isCourseOwner";

export async function PATCH(
  req: Request,
  {
    params: { courseId, projectId,chapterId },
  }: { params: { courseId: string; projectId: string,chapterId: string} }
) {
    
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });

  const {isCourseCreator,error} = await isCourseOwner(courseId)
       if (error) return new NextResponse("An error occured", { status: 505 });
       if (!isCourseCreator) return new NextResponse("Unauthorised", { status: 401 });


    const chapter = await db.chapterProject.findUnique({
        where: {
          id:projectId,
          chapterId
        },
        include:{chapterProjectSessions:true}
      });
    
    

      if(!chapter || !chapter.title || !chapter.description || !chapter.chapterProjectSessions.some((session)=>session.isPublished)){
            return  new NextResponse("Missing required fields", { status: 401 });
      }

    await db.chapterProject.update({
      where: {
        id: projectId,chapterId
      },
      data: {
        isPublished:true,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[CHAPTER_PROJECT_PUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}