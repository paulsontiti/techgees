import { db } from "@/lib/db";
import { Scholarship } from "@prisma/client";

interface ReturnValue {
  scholarship: Scholarship | null;
  error: Error | null;
}
/**
 * Fetches the scholarship with id provided.
 * 

 * @param {string} id - The id of the scholarship.
 * @return {ReturnValue} The scholarship with the id or error.
 */
export const getScholarshipById = async (id: string): Promise<ReturnValue> => {
  try {
    const scholarship = await db.scholarship.findUnique({
      where: {
        id,
      }
    });

  
    return { scholarship, error: null };
  } catch (error: any) {
    console.log("[GET_SCHOLARSHIP]", error);
    return { scholarship: null, error };
  }
};
