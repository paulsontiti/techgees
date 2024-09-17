import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req:Request){

    try{
        const {userId} = auth()
        const {sessionId,score} = await req.json()

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }

        await db.sessionTestScore.create({
            data:{
                userId,
                score,
                sessionId
            }
        })

        if(score > 6){
            await db.userProgress.create({
                data:{
                    sessionId,
                    isCompleted:true,
                    userId
                }
            })

            
            
        }

        
       

        return NextResponse.json('')
    }catch(err){

        console.log("[COURSES]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}