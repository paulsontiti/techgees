import { db } from "@/lib/db";
import { Course } from "@prisma/client";

type ReturnValue ={
  courses:Course[],
  error:Error | null
}

export const getCoursesByCategoryId = async(categoryId:string):
Promise<ReturnValue>=>{
    try{
        const courseCategories = await db.courseCategory.findMany({
            where: {
              categoryId,
            },
          });

          const courseIds = courseCategories.map((cat) => cat.courseId);

          const courses = await db.course.findMany({
            where:{
              id:{
                in:courseIds
              }
            }
          })
          
      return {courses,error:null}
    }catch(error:any){
    console.log(error)
        return {courses:[],error}
    }
    }