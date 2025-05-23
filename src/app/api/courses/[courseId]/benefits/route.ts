import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function POST(req:Request,
    {params:{courseId}}:{
        params:{courseId:string}
    }
){

    try{
        const userId = await getUserCookie()
        const {text} = await req.json()

        if(!userId){
            return new NextResponse("Unautorized",{status:401})
        }

        const course = await db.course.findUnique({
            where:{
               id:courseId
            }
        })

        if(!course){
            return new NextResponse("Unautorized",{status:401})
        }

        await db.courseBenefit.create({
            data:{
                courseId,
                text
            }
        })

        return NextResponse.json('')
    }catch(err){

        console.log("[COURSE_BENEFITS]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const benefits = await db.courseBenefit.findMany({
            where:{
                courseId
            }
        })
        
        return NextResponse.json(benefits);
    } catch (err) {
        console.log("[COURSE_COMMENTS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}
