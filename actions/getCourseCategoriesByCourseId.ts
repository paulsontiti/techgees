import { db } from "@/lib/db";
import { Category } from "@prisma/client";

type ReturnValue ={
  courseCategories:Category[] | null,
  error:Error | null
}

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
          const courseCategories = courseCategoriesByCourseId.map(cc=>cc.category)
      return {courseCategories,error:null}
    }catch(error:any){
    
        return {courseCategories:null,error}
    }
    }