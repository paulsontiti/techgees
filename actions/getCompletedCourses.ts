import { db } from "@/lib/db";
import { getCourseProgress } from "./getCourseProgress";
import { SearchPageCourseType } from "./getCourseWithProgressChapters";

type ReturnValue = {
  courses: SearchPageCourseType[];
  error: Error | null;
};


export const getCompletedCourses = async (
  userId: string
): Promise<ReturnValue> => {
  try {


    const completedCourses = await db.userProgress.findMany({
      where: {
        userId,
        isCompleted: true,
        courseId:{
          not:null
        }
      },
      select: {
                course: {
                  include: {
                    chapters: {
                      where: {
                        //isPublished: true,
                      },
                    },
                  },
                },
        },
      
    });
    const courses:SearchPageCourseType[] = completedCourses.map((cC)=> 
        {
            if(cC.course !== null){

                return {
                    ...cC.course,
                    progressPercentage:0
                }
            }else{
                return null
            }
          }
    )

    for(let course of courses){
        const progress = await getCourseProgress(userId,course?.id ?? "")
        if(course !== null){
            course["progressPercentage"] = progress.progressPercentage
        }
       
    }
  
    return { courses, error: null };
  } catch (error: any) {
    console.log("[getCompletedCourses]", error);
    return { courses: [], error };
  }
};
