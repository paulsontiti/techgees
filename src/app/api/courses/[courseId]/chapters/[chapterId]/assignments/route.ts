import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function POST(req:Request,
    {params:{courseId,chapterId}}:{
        params:{courseId:string,chapterId:string}
    }
){

    try{
        const userId = await getUserCookie()
        const {text} = await req.json()

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }

        const course = await db.course.findUnique({
            where:{
               id:courseId
            }
        })

        if(!course){
            return new NextResponse("Unautorized",{status:401})
        }

        await db.assignment.create({
            data:{
                chapterId,
                text
            }
        })

        return NextResponse.json('')
    }catch(err){

        console.log("[CHAPTER_ASSIGNMENT]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}