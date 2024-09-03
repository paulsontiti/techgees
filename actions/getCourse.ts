import { db } from "@/lib/db";
import { Chapter, ComboCourses, Course, PreRequisiteCourses, RecommendedCourses, Session } from "@prisma/client";

interface ReturnValue{
    course:CourseType | null,
    error:Error | null
  }

  type CourseType = Course & {
    chapters:(Chapter & {
        sessions:Session[]
    })[],
    childrenCourses:(ComboCourses & {
        childCourse:Course & {
            chapters:Chapter[]
        }
    })[],
    preRequisiteCourses:PreRequisiteCourses[],
    recommendedCourses:RecommendedCourses[],
}

export const getCourse = async(courseId:string):
Promise<ReturnValue>=>{
    try{
        const course = await db.course.findUnique({
            where:{
                id:courseId
            },include:{
                chapters:{
                    include:{
                        sessions:true
                    }
                },
                childrenCourses: {
                    include:{
                        childCourse:{
                            include:{
                                chapters:true
                            }
                        }
                    }
                },
                preRequisiteCourses:true,
                recommendedCourses:true
            }
        });
      return {course,error:null}
    }catch(error:any){
    
        return {course:null,error}
    }
    }