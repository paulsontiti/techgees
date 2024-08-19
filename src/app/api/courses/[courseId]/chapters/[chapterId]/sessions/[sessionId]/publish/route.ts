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

    const session = await db.session.findUnique({
        where: {
          id:sessionId,
          chapterId
        },
      });
    

      if(!session || !session.title || !session.description || !session.videoDuration || !session.videoUrl){
            return  new NextResponse("Missing required fields", { status: 404 });
      }

    await db.session.update({
      where: {
        id: sessionId,chapterId
      },
      data: {
        isPublished:true,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[SESSION_PUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}