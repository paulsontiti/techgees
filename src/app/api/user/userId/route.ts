import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    
    try{
       
const userId = await getUserCookie();
if(!userId)  return new NextResponse("Unauthorised",{
    status:401
})
 return NextResponse.json(userId);
    }catch(err){

        console.log("[GET_USERID]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}