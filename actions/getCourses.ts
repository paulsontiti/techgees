import { db } from "@/lib/db";
import { Course } from "@prisma/client";

interface ReturnValue{
    courses:Course[],
    error:Error | null
  }

export const getCourses = async():
Promise<ReturnValue>=>{
    try{
        const courses = await db.course.findMany({
            where:{
            isPublished:true
            },
            orderBy:{
                title:"asc"
            }
        });
      return {courses,error:null}
    }catch(error:any){
    
        return {courses:[],error}
    }
    }