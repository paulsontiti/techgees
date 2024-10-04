import { db } from "@/lib/db";
import { Course } from "@prisma/client";

export interface ReturnValue {
  courseChildren: Course[];
  error: Error | null;
}



export const getCourseChildren = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const courseWithChildren = await db.courseChild.findMany({
      where: {
        parentCourseId: courseId,
      },

      include: {
        childCourse: true
      }, orderBy: {
        position: "asc",
      },
    });
    const courseChildren = courseWithChildren.map((c) => c.childCourse)
    return { courseChildren, error: null };
  } catch (error: any) {
    return { courseChildren: [], error };
  }
};
