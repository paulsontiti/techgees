import { db } from "@/lib/db";
import { ReturnValue } from "./getCourseWithCourseCategoriesAndChapters";





export const getCourses = async():
Promise<ReturnValue>=>{
    try{
        const courses = await db.course.findMany({
            orderBy:{
                createdAt:"desc"
            }
        });
      return {data:courses,error:null}
    }catch(error:any){
    
        return {data:null,error}
    }
    }