import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"


export async function POST(
    req:Request,
    {params:{courseId}}:{params:{courseId:string}}
){

    try{
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorized",{status:401})

        const courseOwner = await db.course.findUnique({
            where:{
                    id:courseId,
                    userId
                
            }
        })
        if(!courseOwner) return new NextResponse("Unauthorized",{status:401})

            const {childCourseId} = await req.json()

        //get last child course in order to know the position of this new child course
        const lastChild = await db.courseChild.findFirst({
            where:{
                parentCourseId:courseId
            },
            orderBy:{
                position:"desc"
            }
        })  
const newPosition = lastChild ? lastChild.position + 1 : 0

await db.courseChild.create({
    data:{
        childCourseId,parentCourseId:courseId,position:newPosition
    }
})

return NextResponse.json("")
    }catch(err){
        console.log("[CHILDRENCOURSES]",err)
        return new NextResponse("Internal error",{status:500})
    }
}