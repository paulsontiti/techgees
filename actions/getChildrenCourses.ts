import { db } from "@/lib/db";
import {Course } from "@prisma/client";

export interface ReturnValue {
  childrenCourses: Course[];
  error: Error | null;
}




export const getChildrenCourses = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const comboCourses = await db.comboCourses.findMany({
      where: {
        parentCourseId: courseId,
      },
      include: {
        childCourse:true
      },
    });

    const childrenCourses = comboCourses.map(child => child.childCourse)

    return { childrenCourses, error: null };
  } catch (error: any) {
    return { childrenCourses: [], error };
  }
};
