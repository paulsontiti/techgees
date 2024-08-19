import { db } from "@/lib/db";
import { ReturnValue } from "./getCourseWithCourseCategoriesAndChapters";





export const getCourseCategoriesByCourseId = async(courseId:string):
Promise<ReturnValue>=>{
    try{
        const courseCategoriesByCourseId = await db.courseCategory.findMany({
            where: {
              courseId,
            },
            include: {
              category: true,
            },
          });
      return {data:courseCategoriesByCourseId,error:null}
    }catch(error:any){
    
        return {data:null,error}
    }
    }