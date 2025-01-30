import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { getCompletedCourses } from "../../../../../actions/getCompletedCourses";

export async function GET(){

    try{
       const userId = await getUserCookie();
       if(!userId)  return new NextResponse("Unauthorised",{
        status:401
    })

const {courses} = await getCompletedCourses(userId);
 
 return NextResponse.json(courses.length);
    }catch(err){

        console.log("[GET_COMPLETED_COURSES_COUNT]",err)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}