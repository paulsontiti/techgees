import { db } from "@/lib/db";
import {Chapter, Course, Session } from "@prisma/client";

export interface ReturnValue {
  childrenCourses: (Course &{
    chapters:(Chapter & {
      sessions:Session[]
    })[]
  })[];
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
      select: {
        childCourse: {
          include: {
            chapters: {
              include: {
                sessions: true,
              },
            },
          },
        },
      },
    });

    const childrenCourses = comboCourses.map(child => child.childCourse)

    return { childrenCourses, error: null };
  } catch (error: any) {
    return { childrenCourses: [], error };
  }
};
