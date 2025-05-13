import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue {
  onScholarship: boolean;
  error: Error | null;
}
/**
 * Checks if a student is on scholarship for the couse.
 * @param {string} courseId - id of the course
 * @return {ReturnValue} boolean or error.
 */
export const isOnScholarship = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const userId = await getUserCookie();
    if (!userId) return { onScholarship: false, error: null };

    const scholarship = await db.scholarship.findUnique({
      where: {
        courseId,
      },
    });

    const scholarshipStudent = await db.scholarshipStudents.findFirst({
      where: {
        userId,
        scholarshipId: scholarship?.id || "",
      },
    });
    return { onScholarship: scholarshipStudent ? true : false, error: null };
  } catch (error: any) {
    console.log("[IS_ON_SCHOLARSHIP]", error);
    return { onScholarship: false, error };
  }
};
