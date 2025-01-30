import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request,
    {
        params: { assignmentAnswerId }
    }: {
        params: { assignmentAnswerId: string }
    }
) {
    try {
        const userId = await getUserCookie();
        const { remark } = await req.json();

        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 });
        }

         await db.assignmentAnswerRemarks.create({
            data: {
               assignmentAnswerId,
               remark,
               userId
            }
        })

        //notify the student

        //get the ansignment answer
        const assignmentAns = await db.assignmentAnswer.findUnique({
            where:{
                id:assignmentAnswerId
            }
        })
        

        //construct a message including the assignment session title

        //get the assignment
        const assignment = await db.assignment.findUnique({
            where:{
                id:assignmentAns?.assignmentId
            }
        })

        //get the session,chapter or course if available
        const session = await db.session.findUnique({
            where:{
                id:assignment?.sessionId ?? ""
            }
        })
        const chapter = await db.chapter.findUnique({
            where:{
                id:assignment?.chapterId ?? ""
            }
        })
        const course = await db.course.findUnique({
            where:{
                id:assignment?.sessionId ?? ""
            }
        })

        //construct title
        const title = session ? session.title :(chapter ? chapter.title : (course ? course.title : ""))
        //construct 
        const message = `Your assignment answer for ${title} got a remark from your instructor`

        await db.notification.create({
            data:{
                receiverId:assignmentAns?.userId ?? "",
                message,
                senderId:userId,
                title:"A message from your instructor"

            }
        })

            return NextResponse.json("");
    } catch (err) {
        console.log("[ASSIGNMENT_ANSWER_REMARK]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}


export async function GET(req: Request,
    {
        params: { assignmentAnswerId }
    }: {
        params: { assignmentAnswerId: string }
    }
) {
    try {
        const userId = await getUserCookie();
        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 });
        }

        const remark = await db.assignmentAnswerRemarks.findUnique({
            where: {
                assignmentAnswerId
            }
        })

       

        return NextResponse.json(remark);
    } catch (err) {
        console.log("[GET_ASSIGNMENT_ANSWER_REMARK]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}


