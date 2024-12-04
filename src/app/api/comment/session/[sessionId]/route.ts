import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request,
  {
    params: { sessionId }
  }: {
    params: { sessionId: string }
  }
) {
  try {
    const userId = await getUserCookie();
    const { comment } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    await db.comment.create({
      data: {
        userId,
        sessionId,
        comment
      },
    });

    //send notification to the instructor
    //get the session
    const session = await db.session.findUnique({
      where: {
        id: sessionId
      }, include: {
        chapter: {
          select: {
            course: true
          }
        }
      }
    })


    //get instructor's id
    const instructorId = session?.chapter.course.userId ?? ""

    //construct title
    const title = session?.title
    //construct 
    const message = `Session with title ${title} has a new comment`

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
    console.log("[SESSION_COMMENT]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
