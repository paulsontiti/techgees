import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req:Request){

    try{
        const {userId} = auth()
        const {name} = await req.json()

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }

        const course = await db.category.create({
            data:{
                name
            }
        })

        return NextResponse.json(course)
    }catch(err){

        console.log("[CATEGORIES]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}