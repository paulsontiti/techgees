import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function GET(){

    try{
       const userId = await getUserCookie();

 const earnings = await db.earning.findMany({
   where:{
    userId
   },orderBy:{
    createdAt:"desc"
   }
 })
 
 return NextResponse.json(earnings);
    }catch(err){

        console.log("[GET_ALL_EARNINGS]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}