import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req:Request,{
params:{userName}
}:{
    params:{userName:string}
}){

    try{
       

 const user = await db.dBUser.findFirst({
   where:{
    userName
   }
 })
      

 return NextResponse.json(user ? true : false)
    }catch(err){

        console.log("[CHECK_USERNAME]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}