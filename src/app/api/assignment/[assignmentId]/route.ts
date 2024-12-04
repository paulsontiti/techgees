import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request,
    {
        params: { assignmentId }
    }: {
        params: { assignmentId: string }
    }
) {
    try {
        const userId = await getUserCookie();
        const { answer } = await req.json();

        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 });
        }

        const ans = await db.assignmentAnswer.findUnique({
            where: {
                userId_assignmentId: {
                    userId, assignmentId
                }
            }
        })

        if (ans) {
            await db.assignmentAnswer.update({
                where: {
                    userId_assignmentId: {
                        userId, assignmentId
                    }
                }, data: {
                    answer
                }
            })
        } else {
            await db.assignmentAnswer.create({
                data: {
                    userId,
                    assignmentId,
                    answer
                },
            });
        }



//construct a message including the assignment session title

//get the assignment
const assignment = await db.assignment.findUnique({
    where:{
        id:assignmentId
    }
})

//get the session,chapter or course if available
const session = await db.session.findUnique({
    where:{
        id:assignment?.sessionId ?? ""
    },include:{
        chapter:{
            select:{
                course:true
            }
        }
    }
})
const chapter = await db.chapter.findUnique({
    where:{
        id:assignment?.chapterId ?? ""
    },include:{
        course:true
    }
})
const course = await db.course.findUnique({
    where:{
        id:assignment?.sessionId ?? ""
    }
})

//get instructor's id
const instructorId = session ? session.chapter.course.userId :(chapter ? chapter.course.userId : (course ? course.userId : ""))

//construct title
const title = session ? session.title :(chapter ? chapter.title : (course ? course.title : ""))
//construct 
const message = `Assignment answer for ${title} has been submitted`

await db.notification.create({
    data:{
        receiverId:instructorId,
        message,
        senderId:userId,
        title:"An answer to assignment was submitted"

    }
})

        return NextResponse.json("");
    } catch (err) {
        console.log("[ASSIGNMENT_ANSWER]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}


