import { db } from "@/lib/db";
import { ReturnValue } from "./getCourseWithCourseCategoriesAndChapters";





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
      return {data:courses,error:null}
    }catch(error:any){
    
        return {data:null,error}
    }
    }