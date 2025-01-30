import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function GET(req:Request,{
params:{year}
}:{
    params:{year:string}
}){

    try{
       const userId = await getUserCookie();

 const earnings = await db.earning.groupBy({
    by:'month',
    _sum:{
        amount:true
    },
   where:{
    userId,year:parseInt(year)
   },orderBy:{
    month:"asc"
   }
 })

 return NextResponse.json(earnings)
    }catch(err){

        console.log("[GET_EARNINGS]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}