import { db } from "@/lib/db";
import { Chapter, Course } from "@prisma/client";

type ReturnValue = {
  recommendedCourses: RecommendedCourseType[] | null;
  error: Error | null;
};

export type RecommendedCourseType = Course &{
    chapters:{id:string}[],
} | null


export const getRecommendedCourses = async (): Promise<ReturnValue> => {
  try {
    const recommendedCourses = await db.course.findMany({
    //  where:{
    //   isPublished:true
    //  },
          include: {
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
    });

  
    return { recommendedCourses, error: null };
  } catch (error: any) {
    console.log("[getRecommendedCourses]", error);
    return { recommendedCourses: [], error };
  }
};
