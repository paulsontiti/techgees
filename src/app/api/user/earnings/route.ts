import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function GET(){

    try{
       const userId = await getUserCookie();

 const earnings = await db.earning.aggregate({
   _sum:{
    amount:true
   },
   where:{
    userId
   }
 })
 
 return NextResponse.json(earnings._sum.amount);
    }catch(err){

        console.log("[GET_SUM_EARNINGS]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}