import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { getInProgressCourses } from "../../../../../actions/getInProgressCourses";

export async function GET(){

    try{
       const userId = await getUserCookie();
       if(!userId)  return new NextResponse("Unauthorised",{
        status:401
    })

const {courses,error} = await getInProgressCourses(userId);
 
 return NextResponse.json(courses.length);
    }catch(err){

        console.log("[GET_IN_PROGRESS_COURSES_COUNT]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}