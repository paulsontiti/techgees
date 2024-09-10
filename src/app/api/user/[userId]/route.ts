import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req:Request,{
params:{userId}
}:{
    params:{userId:string}
}){

    try{
       

 const user = await db.user.findUnique({
   where:{
    userId
   }
 })

        
       

 return NextResponse.json(user)
    }catch(err){

        console.log("[USER_SIGNUP]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}