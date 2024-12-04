import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request,
  {
    params: { courseId }
  }: {
    params: { courseId: string }
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
        courseId,
        comment
      },
    });


    //send notification to the instructor
    //get the session
    const course = await db.course.findUnique({
      where: {
        id: courseId
      }
    })


    //get instructor's id
    const instructorId = course?.userId ?? ""

    //construct title
    const title = course?.title
    //construct 
    const message = `Course with title ${title} has a new comment`

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
    console.log("[COURSE_COMMENT]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
