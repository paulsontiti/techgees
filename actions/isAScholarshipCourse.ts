import { db } from "@/lib/db";

interface ReturnValue {
  scholarshipCourse: boolean;
  error: Error | null;
}
/**
 * Checks if a student is on scholarship for the couse.
 * @param {string} courseId - id of the course
 * @return {ReturnValue} boolean or error.
 */
export const isAScholarshipCourse = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
   
    const scholarship = await db.scholarship.findUnique({
      where: {
        courseId,
      },
    });

    return { scholarshipCourse: scholarship ? true : false, error: null };
  } catch (error: any) {
    console.log("[IS_A_SCHOLARSHIP_COURSE]", error);
    return { scholarshipCourse: false, error };
  }
};
