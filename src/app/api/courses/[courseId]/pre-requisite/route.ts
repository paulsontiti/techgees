import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { getPrerequisiteCourses } from "../../../../../../actions/getPreRequisiteCourses";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try{
       const userId = await getUserCookie();
       if(!userId)  return new NextResponse("Unauthorised",{
        status:401
    })

    const { preRequisiteCourses} = await getPrerequisiteCourses(courseId)
 
 return NextResponse.json(preRequisiteCourses);
    }catch(err){

        console.log("[GET_PREREQUISITE_COURSES]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}