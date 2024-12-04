import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function POST(req:Request,
    {params:{courseId}}:{params:{courseId:string}}
){

    try{
        const userId = await getUserCookie()
        const selectedCourseIds:string[] = await req.json()
       

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }


        await db.recommendedCourses.deleteMany({
            where:{
                courseId,
            }
        })

        if(!!selectedCourseIds.length){
           for(let id of selectedCourseIds){
            await db.recommendedCourses.create({
                data:{
                    courseId,
                    recommendedCourseId:id
                }
            })
           }
        }

   

       


        return NextResponse.json('')
    }catch(err){

        console.log("[COURSE_CHILDREN]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}