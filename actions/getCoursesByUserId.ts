import { db } from "@/lib/db";
import { Course } from "@prisma/client";


interface ReturnValue{
    courses:Course[] | null,
    error:Error | null
}


export const getCoursesByUserId = async(userId:string):
Promise<ReturnValue>=>{
    try{
        const courses = await db.course.findMany({
            where:{
                userId
            },orderBy:{
                createdAt:"desc"
            }
        });
      return {courses,error:null}
    }catch(error:any){
    
        return {courses:null,error}
    }
    }