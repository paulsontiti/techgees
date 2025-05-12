import { db } from "@/lib/db";

interface ReturnValue {
  scholarshipCount: number;
  error: Error | null;
}
/**
 * Fetches count scholarship courses by a student.
 * 

 * @param {string} userId - The id of the scholarship.
 * @return {ReturnValue} The scholarship with the id or error.
 */
export const getScholarshipCoursesCount = async (
  userId: string
): Promise<ReturnValue> => {
  try {
    const scholarshipCount = await db.paystackPayment.count({
      where: {
        userId,
        payment_status: "success",
        NOT: {
          scholarshipId: null,
        },
      },
    
    });

 
    return { scholarshipCount, error: null };
  } catch (error: any) {
    console.log("[GET_SCHOLARSHIP_COURSES_COUNT]", error);
    return { scholarshipCount:0, error };
  }
};
