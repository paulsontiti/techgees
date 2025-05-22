import { db } from "@/lib/db";
import { Course } from "@prisma/client";

interface ReturnValue {
  course: Course | null;
  error: Error | null;
}
/**
 * Fetches the course with scholarship id provided.
 * 

 * @param {string} scholarshipId - The id of the scholarship.
 * @return {ReturnValue} The course with the id or error.
 */
export const getCourseByScholarshipById = async (scholarshipId: string): Promise<ReturnValue> => {
  try {
    const scholarship = await db.scholarship.findUnique({
      where: {
        id:scholarshipId,
      },include:{
        course:true
      }
    });

  const course = scholarship ? scholarship.course : null;
    return { course, error: null };
  } catch (error: any) {
    console.log("[GET_COURSE_BY_SCHOLARSHIPID]", error);
    return { course: null, error };
  }
};
