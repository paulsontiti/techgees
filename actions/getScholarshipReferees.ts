import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { ScholarshipStudents } from "@prisma/client";

interface ReturnValue {
  referees: ScholarshipStudents[];
  error: Error | null;
}
/**
 * Fetches the referer of the current user.
 * 
 * @return {ReturnValue} The refrerees or error.
 */
export const getScholarshipReferees = async (

): Promise<ReturnValue> => {
  try {
    const userId = await getUserCookie();
    if (!userId) return { referees: [], error: null };

    const referees = await db.scholarshipStudents.findMany({
      where: {
        refererId: userId,
      },
    });

    return { referees, error: null };
  } catch (error: any) {
    console.log("[SCHOLARSHIP_REFEREES]", error);
    return { referees: [], error };
  }
};
