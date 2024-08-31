import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(
    req:Request,
    {params:{courseId,chapterId}}:{params:{courseId:string,chapterId:string}}
){

    try{
        const {userId} = auth()
        if(!userId) return new NextResponse("Unauthorized",{status:401})

        const courseOwner = await db.course.findUnique({
            where:{
            
                    id:courseId,
                    userId
                
            }
        })
        if(!courseOwner) return new NextResponse("Unauthorized",{status:401})

            const {title} = await req.json()

        //get last session in order to know the position of this new session
        const lastSession = await db.session.findFirst({
            where:{
                chapterId
            },
            orderBy:{
                position:"desc"
            }
        })  
const newPosition = lastSession ? lastSession.position + 1 : 0

await db.session.create({
    data:{
        title,chapterId,position:newPosition
    }
})

return NextResponse.json("")
    }catch(err){
        console.log("[SESSIONS]",err)
        return new NextResponse("Internal error",{status:500})
    }
}