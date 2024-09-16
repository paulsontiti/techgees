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
   
   
    const freeCourses = await db.course.findMany({
      where: {
        isFree:true
      },include:{
        chapters:true
      }
     
    });
    let courses: SearchPageCourseType[] = filteredPurchasedCourses.map(
      (course) => {
        return {
            ...course,
            progressPercentage:0
        }
      }
    );
    
   
        for(let freeCourse of freeCourses){
            if(freeCourse){

                if(!courses.find((course)=> course?.id === freeCourse.id)){
                    courses.push({...freeCourse,progressPercentage:0})
                }
            }
        }
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
