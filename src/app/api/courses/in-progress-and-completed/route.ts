import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { getInProgressCourses } from "../../../../../actions/getInProgressCourses";
import { getCompletedCourses } from "../../../../../actions/getCompletedCourses";

export async function GET(){

    try{
       const userId = await getUserCookie();
       if(!userId)  return new NextResponse("Unauthorised",{
        status:401
    })

    const { courses: inProgress} = await getInProgressCourses(userId)
  
    const { courses: completedCourses} =
      await getCompletedCourses(userId)
  
  
  
    const courses = [...inProgress, ...completedCourses]
 
 return NextResponse.json(courses);
    }catch(err){

        console.log("[GET_IN_PROGRESS_AND_COMPLETED_COURSES]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}