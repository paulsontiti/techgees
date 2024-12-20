import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";


export async function PATCH(req: Request,
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

     
            await db.assignmentAnswer.update({
                where: {
                   id:assignmentAnswerId
                    
                }, data: {
                    passed:true
                }
            })

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
        const message = `Your assignment answer for ${title} has been passed`

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
        console.log("[ASSIGNMENT_PASS]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}