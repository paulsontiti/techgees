import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req:Request,
    {params:{courseId}}:{params:{courseId:string}}
){

    try{
        const {userId} = auth()
        const selectedCategoryIds:string[] = await req.json()
       

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }

        await db.courseCategory.deleteMany({
            where:{
                courseId,
            }
        })

        if(!!selectedCategoryIds.length){
           for(let categoryId of selectedCategoryIds){
            await db.courseCategory.create({
                data:{
                    courseId,
                    categoryId
                }
            })
           }
        }


        return NextResponse.json('')
    }catch(err){

        console.log("[COURSE_CATEGORY]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}