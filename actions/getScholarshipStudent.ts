import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { ScholarshipStudents } from "@prisma/client";

interface ReturnValue {
  scholarshipStudent: ScholarshipStudents | null;
  error: Error | null;
}
/**
 * Fetches a scholarship student by scholarship id provided.
 * 

 * @param {string} scholarshipId - The id of the scholarship.
 * @return {ReturnValue} The scholarship student or error.
 */
export const getScholarshipStudent = async (scholarshipId: string): Promise<ReturnValue> => {
  try {

    const userId = await getUserCookie();
    if(!userId) return { scholarshipStudent: null, error:new Error("No student userId found") };

    const scholarshipStudent = await db.scholarshipStudents.findUnique({
      where: {
        userId_scholarshipId:{
            scholarshipId,
            userId
        }
      }
    });

  
    return { scholarshipStudent, error: null };
  } catch (error: any) {
    console.log("[GET_SCHOLARSHIP_STUDENT]", error);
    return { scholarshipStudent: null, error };
  }
};
