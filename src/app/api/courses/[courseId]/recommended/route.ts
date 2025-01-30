import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { getCourseRecommendedCourses } from "../../../../../../actions/getCourseRecommendedCourses";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try{
       const userId = await getUserCookie();
       if(!userId)  return new NextResponse("Unauthorised",{
        status:401
    })

    const { recommendedCourses} = await getCourseRecommendedCourses(courseId)
 
 return NextResponse.json(recommendedCourses);
    }catch(err){

        console.log("[GET_RECOMMENDED_COURSES]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}