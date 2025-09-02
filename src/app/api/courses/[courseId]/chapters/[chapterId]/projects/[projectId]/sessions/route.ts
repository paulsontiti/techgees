import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"


export async function POST(
    req:Request,
    {params:{courseId,projectId:chapterProjectId}}:{params:{courseId:string,projectId:string}}
){

    try{
        const userId = await getUserCookie()
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
        const lastSession = await db.chapterProjectSession.findFirst({
            where:{
                chapterProjectId
            },
            orderBy:{
                position:"desc"
            }
        })  
const newPosition = lastSession ? lastSession.position + 1 : 0

await db.chapterProjectSession.create({
    data:{
        title,chapterProjectId,position:newPosition
    }
})

return NextResponse.json("")
    }catch(err){
        console.log("[CHAPTER_PROJECT_SESSIONS]",err)
        return new NextResponse("Internal error",{status:500})
    }
}