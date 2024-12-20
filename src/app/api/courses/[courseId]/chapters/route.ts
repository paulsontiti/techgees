import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"


export async function POST(
    req:Request,
    {params:{courseId}}:{params:{courseId:string}}
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

        //get last chapter in order to know the position of this new chapter
        const lastChapter = await db.chapter.findFirst({
            where:{
                courseId
            },
            orderBy:{
                position:"desc"
            }
        })  
const newPosition = lastChapter ? lastChapter.position + 1 : 0

await db.chapter.create({
    data:{
        title,courseId,position:newPosition
    }
})

return NextResponse.json("")
    }catch(err){
        console.log("[CHAPTERS]",err)
        return new NextResponse("Internal error",{status:500})
    }
}