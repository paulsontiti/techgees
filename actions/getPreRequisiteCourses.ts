import { db } from "@/lib/db";
import {Course } from "@prisma/client";

export interface ReturnValue {
  preRequisiteCourses: Course[];
  error: Error | null;
}




export const getPrerequisiteCourses = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const preReCourses = await db.preRequisiteCourses.findMany({
      where: {
        parentCourseId: courseId,
      },
      include: {
        preRequisite:true
      },
    });

    const preRequisiteCourses = preReCourses.map(pre => pre.preRequisite)

    return { preRequisiteCourses, error: null };
  } catch (error: any) {
    return { preRequisiteCourses: [], error };
  }
};
