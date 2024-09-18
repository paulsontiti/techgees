import { db } from "@/lib/db";
import { getCourseProgress } from "./getCourseProgress";
import { SearchPageCourseType } from "./getCourseWithProgressChapters";

type ReturnValue = {
  courses: SearchPageCourseType[];
  error: Error | null;
};


export const getInProgressCourses = async (
  userId: string
): Promise<ReturnValue> => {
  try {
    const purchasedCourses = await db.paystackPayment.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            chapters: true
          },
        },
      },
    });

    //filter repeated courses
    const filteredPurchasedCourses:any[] = []

    for(let purchasedcourse of purchasedCourses){
      if(!filteredPurchasedCourses.find((cou) => cou.id === purchasedcourse.course.id)){
        filteredPurchasedCourses.push(purchasedcourse.course)
      }
    }
   
    const startedSessions = await db.userProgress.findMany({
      where: {
        userId,
      },
      select: {
        session: {
          include:{
            chapter:{
              include:{
                course:{
                  include: {
                    chapters: true
                  },
                }
              }
            }
          }
        }
      },
    });
   
    for(let startedSession of startedSessions){
      const course = startedSession.session?.chapter.course
     if(course !== undefined){
      if(!filteredPurchasedCourses.find((cou) => cou.id === course.id)){
        filteredPurchasedCourses.push(course)
      }
     }
    }
  
    let courses: SearchPageCourseType[] = filteredPurchasedCourses.map(
      (course) => {
        return {
            ...course,
            progressPercentage:0
        }
      }
    );
    
  
    for(let course of courses){
        const progress = await getCourseProgress(userId,course?.id ?? "")
        if(course !== null){
            course["progressPercentage"] = progress.progressPercentage
        }
       
    }
    
    return { courses, error: null };
  } catch (error: any) {
    console.log("[getInProgressCourses]", error);
    return { courses: [], error };
  }
};
