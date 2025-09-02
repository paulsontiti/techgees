import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";
import { isCourseOwner } from "../../../../../../../../../../../../actions/isCourseOwner";

export async function PATCH(
  req: Request,
  {
    params: { courseId, projectId:chapterProjectId, sessionId },
  }: { params: { courseId: string; projectId: string; sessionId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });


     const {isCourseCreator,error} = await isCourseOwner(courseId)
       if (error) return new NextResponse("An error occured", { status: 505 });
       if (!isCourseCreator) return new NextResponse("Unauthorised", { status: 401 });

    const session = await db.chapterProjectSession.findUnique({
        where: {
          id:sessionId,
          chapterProjectId
        },
      });
    

      if(!session || !session.title || !session.description || !session.videoDuration || !session.videoUrl){
            return  new NextResponse("Missing required fields", { status: 404 });
      }

    await db.chapterProjectSession.update({
      where: {
        id: sessionId,chapterProjectId
      },
      data: {
        isPublished:true,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[CHAPTER_PROJECT_SESSION_PUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}