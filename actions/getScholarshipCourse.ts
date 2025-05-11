import { db } from "@/lib/db";
import { Course } from "@prisma/client";

interface ReturnValue {
  course: Course | null;
  error: Error | null;
}
/**
 * Fetches the course associated with the scholarship with id provided.
 * 

 * @param {string} scholarshipId - The id of the scholarship.
 * @return {ReturnValue} The scholarship with the id or error.
 */
export const getScholarshipCourse = async (scholarshipId: string): Promise<ReturnValue> => {
  try {
    const scholarship = await db.scholarship.findUnique({
      where: {
        id:scholarshipId,
      },select:{
        course:true
      }
    });

    const course = scholarship?.course || null;
  
    return { course, error: null };
  } catch (error: any) {
    console.log("[GET_SCHOLARSHIP_COURSE]", error);
    return { course: null, error };
  }
};
