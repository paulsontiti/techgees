import { db } from "@/lib/db";
import { Scholarship } from "@prisma/client";

interface ReturnValue {
  scholarship: Scholarship | null;
  error: Error | null;
}
/**
 * Fetches the scholarship by course id provided.
 * 

 * @param {string} courseId - The id of the course.
 * @return {ReturnValue} The scholarship with the id or error.
 */
export const getScholarshipByCourseId = async (courseId: string): Promise<ReturnValue> => {
  try {
    const scholarship = await db.scholarship.findUnique({
      where: {
        courseId,
      }
    });

  
    return { scholarship, error: null };
  } catch (error: any) {
    console.log("[GET_SCHOLARSHIP_BY_COURSEID]", error);
    return { scholarship: null, error };
  }
};
