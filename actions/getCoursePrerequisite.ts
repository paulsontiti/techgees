import { db } from "@/lib/db";

export interface ReturnValue {
  preRequisiteCourses: {id:string,title:string} [];
  error: Error | null;
}




export const getCoursePrerequisiteWithIdAndTitle = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const preRequisite = await db.preRequisiteCourses.findMany({
      where: {
        parentCourseId: courseId,
      },
      select: {
        preRequisite:true
      },
    });

    const preRequisiteCourses = preRequisite.map(preRequisite => {
      return {id:preRequisite.preRequisite.id,title:preRequisite.preRequisite.title}
  })

    return { preRequisiteCourses, error: null };
  } catch (error: any) {
    return { preRequisiteCourses: [], error };
  }
};
