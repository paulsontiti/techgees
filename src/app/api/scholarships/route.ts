import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function POST(req:Request){

    try{
        const userId = await getUserCookie()
        const {title} = await req.json()

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }

        const scholarship = await db.scholarship.create({
            data:{
                authorId:userId,
                title
            }
        })

        return NextResponse.json(scholarship.id)
    }catch(err){

        console.log("[CREATE_SCHPLARSHIP]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

