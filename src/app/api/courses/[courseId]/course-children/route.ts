import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req:Request,
    {params:{courseId}}:{params:{courseId:string}}
){

    try{
        const {userId} = auth()
        const selectedCourseIds:string[] = await req.json()
       

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }


        await db.comboCourses.deleteMany({
            where:{
                parentCourseId: courseId,
            }
        })

        if(!!selectedCourseIds.length){
           for(let id of selectedCourseIds){
            await db.comboCourses.create({
                data:{
                    parentCourseId: courseId,
                    childCourseId:id
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