import { db } from "@/lib/db";
import {Course } from "@prisma/client";

export interface ReturnValue {
  recommendedCourses: Course[];
  error: Error | null;
}




export const getCourseRecommendedCourses = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const reCommCourses = await db.recommendedCourses.findMany({
      where: {
        courseId,
      },
      include: {
        recommendedCourse:true
      },
    });

    const recommendedCourses = reCommCourses.map(course => course.recommendedCourse)

    return { recommendedCourses, error: null };
  } catch (error: any) {
    return { recommendedCourses: [], error };
  }
};
