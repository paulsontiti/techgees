import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,{params:{notificationId}}:{
        params:{notificationId:string}
    }){

    try{
        
const {userId} = auth()
if(!userId)  return new NextResponse("Unauthoried",{status:401})



        await db.notification.update({
            where:{
                    receiverId:userId,
                    id:notificationId
                
            },
            data:{
                status:"Read"
            }
        })

        return NextResponse.json("")
    
    }catch(err){
        console.log("[NOTIFICATIONID_UPDATE]",err)
        return new NextResponse("Internal error",{status:500})
    }
}