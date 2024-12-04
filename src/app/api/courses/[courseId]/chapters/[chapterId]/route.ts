import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"


export async function PATCH(
    req:Request,
    {params:{courseId,chapterId}}:{params:{courseId:string,chapterId:string}}
){

    try{
        
const userId = await getUserCookie()

if(!userId)  return new NextResponse("Unauthorized user",{status:401})

    const {isPublished,...values} = await req.json()

    const course = await db.course.findUnique({
        where:{
                id:courseId,
                userId
            
        }
    })
    console.log(course)
    if(!course)  return new NextResponse("Unauthorized,you are not the creator of this course",{status:401})

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

export async function DELETE(
    req:Request,
    {params:{courseId,chapterId}}:{params:{courseId:string,chapterId:string}}
){

    try{
        
const userId = await getUserCookie()
if(!userId)  return new NextResponse("Unauthoried",{status:401})


    const course = await db.course.findUnique({
        where:{
          
                id:courseId,
                userId
            
        }
    })
    if(!course)  return new NextResponse("Unauthoried",{status:401})

    const chapter = await db.chapter.findUnique({
        where:{
            id_courseId:{
                id:chapterId,
                courseId
            }
        }
    })

    if(!chapter)  return new NextResponse("Unauthoried",{status:401})

        await db.chapter.delete({
            where:{
                id_courseId:{
                    id:chapterId,
                    courseId
                }
            }
        })

        const publishedChaptersInCourse = await db.chapter.findMany({
            where:{
                courseId,
                isPublished:true
            }
        })

        if(!publishedChaptersInCourse.length){
            await db.course.update({
                where:{
                    id:courseId
                },
                data:{
                    isPublished:false
                }
            })
        }

        return NextResponse.json("")
    
    }catch(err){
        console.log("[COURSE_CHAPTER_ID_DELETE]",err)
        return new NextResponse("Internal error",{status:500})
    }
}