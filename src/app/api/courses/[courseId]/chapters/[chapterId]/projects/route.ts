import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"


export async function POST(
    req:Request,
    {params:{courseId,chapterId}}:{params:{courseId:string,chapterId:string}}
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

        //get last project in order to know the position of this new project
        const lastProject = await db.chapterProject.findFirst({
            where:{
                chapterId
            },
            orderBy:{
                position:"desc"
            }
        })  
const newPosition = lastProject ? lastProject.position + 1 : 0

await db.chapterProject.create({
    data:{
        title,chapterId,position:newPosition
    }
})

return NextResponse.json("")
    }catch(err){
        console.log("[CHAPTER_PROJECT]",err)
        return new NextResponse("Internal error",{status:500})
    }
}