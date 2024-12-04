import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,{params:{notificationId}}:{
        params:{notificationId:string}
    }){

    try{
        
const userId = await getUserCookie();
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