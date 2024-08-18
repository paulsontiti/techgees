import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function PATCH(
    req:Request,
    {params:{courseId,chapterId}}:{params:{courseId:string,chapterId:string}}
){

    try{
        
const {userId} = auth()
if(!userId)  return new NextResponse("Unauthoried",{status:401})

    const {isPublished,...values} = await req.json()

    const course = await db.course.findUnique({
        where:{
            id_userId:{
                id:courseId,
                userId
            }
        }
    })
    if(!course)  return new NextResponse("Unauthoried",{status:401})

        await db.chapter.update({
            where:{
                id_courseId:{
                    id:chapterId,
                    courseId
                }
            },
            data:{
                ...values
            }
        })

        return NextResponse.json("")
    
    }catch(err){
        console.log("[COURSE_CHAPTER_ID]",err)
        return new NextResponse("Internal error",{status:500})
    }
}