import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"


export async function PATCH(
    req:Request,
    {params:{courseId}}:{params:{courseId:string}}
){

    try{
        
const userId = await getUserCookie()
if(!userId)  return new NextResponse("Unauthoried",{status:401})

    const values = await req.json()

    const course = await db.course.findUnique({
        where:{
                id:courseId,
                userId
            
        }
    })
    if(!course)  return new NextResponse("Unauthoried",{status:401})

        await db.course.update({
            where:{
                    id:courseId,
                    userId
                
            },
            data:{
                ...values
            }
        })

        return NextResponse.json("")
    
    }catch(err){
        console.log("[COURSE_ID]",err)
        return new NextResponse("Internal error",{status:500})
    }
}


export async function DELETE(
    req:Request,
    {params:{courseId}}:{params:{courseId:string}}
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

  
  

        await db.course.delete({
            where:{
                id: courseId
                }
            
        })


        return NextResponse.json("")
    
    }catch(err){
        console.log("[COURSE_CHAPTER_ID_DELETE]",err)
        return new NextResponse("Internal error",{status:500})
    }
}