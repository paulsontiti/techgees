import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE(req:Request,
{
    params:{sessionId,attachmentId,courseId}
}:{
    params:{sessionId:string,attachmentId:string,courseId:string}
}
){

    try{
        const {userId} = auth()

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

        const attachment = await db.attachment.findUnique({
            where:{
                id:attachmentId,
                sessionId
            }
        })
        if(!attachment){
            return new NextResponse("Unautorized",{status:401})
        }

        await db.attachment.delete({
           where:{
            id:attachmentId,
            sessionId
           }
        })

        return NextResponse.json("")
    }catch(err){

        console.log("[Session_Attachment_delete]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}