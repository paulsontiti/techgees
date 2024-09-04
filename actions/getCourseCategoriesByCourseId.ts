import { db } from "@/lib/db";
import { Category } from "@prisma/client";

type ReturnValue ={
  categories:Category[] | null,
  error:Error | null
}

export const getCourseCategoriesByCourseId = async(courseId:string):
Promise<ReturnValue>=>{
    try{
        const courseCategories = await db.courseCategory.findMany({
            where: {
              courseId,
            },
          });

          const categoryIds = courseCategories.map((cat) => cat.categoryId);

          const categories = await db.category.findMany({
            where:{
              id:{
                in:categoryIds
              }
            }
          })
          
      return {categories,error:null}
    }catch(error:any){
    console.log(error)
        return {categories:null,error}
    }
    }