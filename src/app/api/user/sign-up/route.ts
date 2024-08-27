import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(req:Request){

    try{
        const {userId} = auth()
        const user = await currentUser()
        if(!userId || !user){
            return new NextResponse("Unautorized",{status:401})
        }

 await db.user.create({
    data:{
        userId,
        firstName:user.firstName!,
        lastName:user.lastName!,
        email:user.emailAddresses[0].emailAddress,
        phone:user.phoneNumbers[0].phoneNumber,
        imageUrl:user.imageUrl

    }
 })

        
       

 return redirect("/dashboard")
    }catch(err){

        console.log("[USER_SIGNUP]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}