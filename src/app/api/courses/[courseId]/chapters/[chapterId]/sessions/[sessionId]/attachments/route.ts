import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function POST(req:Request,
{
    params:{courseId,chapterId,sessionId}
}:{
    params:{courseId:string,chapterId:string, sessionId:string}
}
){

    try{
        const userId = await getUserCookie()
        const {url} = await req.json()

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }
        const course = await db.course.findUnique({
            where:{
                id:courseId,
                userId
            }
        })

        if(!course){
            return new NextResponse("Unautorized",{status:401})
        }

        const session = await db.session.findUnique({
            where:{
                id:sessionId,
                chapterId
            }
        })
        if(!session){
            return new NextResponse("Unautorized",{status:401})
        }

        await db.attachment.create({
            data:{
               sessionId,
               name:url.split("/").pop(),
               url
            }
        })

        return NextResponse.json("")
    }catch(err){

        console.log("[Session_Attachment]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}