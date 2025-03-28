import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req:Request,{
params:{userId}
}:{
    params:{userId:string}
}){

    try{
       

 const user = await db.dBUser.findUnique({
   where:{
    userId
   }
 })
      

 return NextResponse.json(user?.userName || user?.email || "")
    }catch(err){

        console.log("[USERNAME]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}