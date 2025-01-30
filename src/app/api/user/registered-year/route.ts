import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function GET(req:Request){

    try{
       
const userId = await getUserCookie();
if(!userId) return new NextResponse("Unauthorised",{
    status:401
})
 const user = await db.dBUser.findUnique({
   where:{
    userId
   },select:{
    createdAt:true
   }
 })

        
       

 return NextResponse.json(user?.createdAt.getFullYear());
    }catch(err){

        console.log("[GET_REGISTERED_YEAR]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}