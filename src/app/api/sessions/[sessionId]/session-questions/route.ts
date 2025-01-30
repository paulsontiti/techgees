import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request,{
params:{sessionId}
}:{
  params:{sessionId:string}
}) {
  try {
    const userId = await getUserCookie();
    const {question} = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
 
      await db.sessionQuestion.create({
        data: {
         question,
         sessionId,userId
        },
      });

      //notify the instructor

      const session = await db.session.findUnique({
        where:{
          id:sessionId
        },include:{
          chapter:{
            include:{
              course:true
            }
          }
        }
      })
      await db.notification.create({
        data:{
          message:`There is a question on ${session?.title} of ${session?.chapter.title} of 
          ${session?.chapter.course.title}`,
          senderId:userId,
          receiverId:session?.chapter.course.userId || '',
          title:"A question has been asked"
        }
      })

    return NextResponse.json("");
  } catch (err) {
    console.log("[SESSION_ASK_QUESTION]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
