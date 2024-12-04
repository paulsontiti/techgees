import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"



export async function PATCH(
    req:Request
){

    try{
        
const userId = await getUserCookie()
if(!userId)  return new NextResponse("Unauthoried",{status:401})

    const values = await req.json()


        await db.dBUser.update({
            where:{
                    userId
                
            },
            data:{
                ...values
            }
        })

        return NextResponse.json("")
    
    }catch(err){
        console.log("[PROFILE_UPDATE]",err)
        return new NextResponse("Internal error",{status:500})
    }
}