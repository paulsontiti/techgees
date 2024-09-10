import { db } from "@/lib/db";

type ReturnValue = {
  recommendedCourses: {id:string,title:string}[];
  error: Error | null;
};




export const getRecommendedCoursesForMobileSidebar = async (): Promise<ReturnValue> => {
  try {
    const recommendedCourses = await db.course.findMany({
     where:{
      isPublished:true
     },select:{
      id:true,
      title:true
     }
    });

  
    return { recommendedCourses, error: null };
  } catch (error: any) {
    console.log("[GET_RECOMMENDED_COURSES_FOR_MOBILE_SIDEBAR]", error);
    return { recommendedCourses: [], error };
  }
};
