import { db } from "@/lib/db";
import { Scholarship } from "@prisma/client";

interface ReturnValue {
  scholarships: Scholarship[];
  error: Error | null;
}
/**
 * Fetches the scholarships.
 *
 * @return {ReturnValue} The scholarship with the id or error.
 */
export const getScholarships = async (): Promise<ReturnValue> => {
  try {
    const scholarships = await db.scholarship.findMany({
      where: {
        isPublished:true,
      }
    });

  
    return { scholarships, error: null };
  } catch (error: any) {
    console.log("[GET_SCHOLARSHIPS]", error);
    return { scholarships:[], error };
  }
};
