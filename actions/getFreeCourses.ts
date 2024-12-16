import { db } from "@/lib/db";
import { Chapter, Course, CourseBenefit, Session } from "@prisma/client";

interface ReturnValue {
  freeCourses: Course[];
  error: Error | null;
}

export const getFreeCourses = async (): Promise<ReturnValue> => {
  try {
    
    const freeCourses = await db.course.findMany({
      where: {
        isFree: true
      },
      // include: {
      //   courseBenefits: true,
      //   chapters: {
      //     include: {

      //       sessions: {
      //         orderBy: {
      //           position: "asc",
      //         },
      //       },

      //     },
      //     orderBy: {
      //       position: "asc",
      //     },
      //   },
      // },
    });
    return { freeCourses, error: null };
  } catch (error: any) {
    return { freeCourses: [], error };
  }
};
