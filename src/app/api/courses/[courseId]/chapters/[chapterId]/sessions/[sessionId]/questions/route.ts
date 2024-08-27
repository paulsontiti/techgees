import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req:Request,
{
    params:{courseId,chapterId,sessionId}
}:{
    params:{courseId:string,chapterId:string, sessionId:string}
}
){

    try{
        const {userId} = auth()
        const {question,answer,optionA,optionB,optionC,optionD} = await req.json()

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }
        const course = await db.course.findUnique({
            where:{
                id:courseId,
                userId
            }
        })

        if(!course){
            return new NextResponse("Unautorized",{status:401})
        }

        const session = await db.session.findUnique({
            where:{
                id:sessionId,
                chapterId
            }
        })
        if(!session){
            return new NextResponse("Unautorized",{status:401})
        }

        await db.question.create({
            data:{
               sessionId,
               chapterId,courseId,
               question,answer,options:{
                "optionA":optionA,
                "optionB":optionB,
                "optionC":optionC,
                "optionD":optionD,
               }
            }
        })

        return NextResponse.json("")
    }catch(err){

        console.log("[Session_Question]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}