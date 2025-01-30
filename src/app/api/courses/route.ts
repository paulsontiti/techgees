import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function POST(req:Request){

    try{
        const userId = await getUserCookie()
        const {title} = await req.json()

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }

        const course = await db.course.create({
            data:{
                userId,
                title
            }
        })

        return NextResponse.json(course)
    }catch(err){

        console.log("[COURSES]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

export async function GET(req:Request){

    try{
    
        const courses = await db.course.findMany({
            where:{
                isPublished:true
            }
        })

        return NextResponse.json(courses)
    }catch(err){

        console.log("[GET_COURSES]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}