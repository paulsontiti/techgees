import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request,
  {
    params: { chapterId }
  }: {
    params: { chapterId: string }
  }
) {
  try {
    const { userId } = auth();
    const { comment } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    await db.comment.create({
      data: {
        userId,
        chapterId,
        comment
      },
    });

    //send notification to the instructor
    //get the session
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId
      }, include: {
        course: true
      }
    })


    //get instructor's id
    const instructorId = chapter?.course.userId ?? ""

    //construct title
    const title = chapter?.title
    //construct 
    const message = `Chapter with title ${title} has a new comment`

    await db.notification.create({
      data: {
        receiverId: instructorId,
        message,
        senderId: userId,
        title: "New comment"

      }
    })


    return NextResponse.json("");
  } catch (err) {
    console.log("[CHAPTER_COMMENT]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
