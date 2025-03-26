import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(
    req: Request,
    { params: {courseId,userId } }: { params: { courseId: string,userId:string } }
) {

    try {
       const course = await db.course.findUnique({
        where:{
            id:courseId
        },include:{
            chapters:{
                include:{
                    sessions:true
                }
            }
        }
       })
const sessions = course?.chapters.map(chapter => chapter.sessions).flat();
const sessionIds = sessions?.map(session => session.id)


const testScores = await db.sessionTestScore.findMany({
    where:{
        userId,
        sessionId:{in: sessionIds}
    }
})

const scores = testScores.map(test => test.score);
const points = scores.reduce((a,acc)=> a + acc,0)

        return NextResponse.json(points);
    } catch (err) {
        console.log("[GET_PARTICIPANT_POINTS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}
