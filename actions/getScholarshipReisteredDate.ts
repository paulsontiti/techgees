import { db } from "@/lib/db";

interface ReturnValue {
  registeredDate: Date | null;
  error: Error | null;
}
/**
 * Fetches the date a student registered for a scholarship.
 * 

 * @param {string} userId - The id of the student.
@param {string} scholarshipId - The id of the scholarship.
 * @return {ReturnValue} The date or error.
 */
export const getScholarshipRegisteredDate = async (
  userId: string,scholarshipId:string
): Promise<ReturnValue> => {
  try {
    const payment = await db.paystackPayment.findFirst({
      where: {
        userId,
        payment_status: "success",
        scholarshipId
      },
      select: {
       createdAt:true
      },
    });

    const registeredDate = payment?.createdAt || null;


    return { registeredDate, error: null };
  } catch (error: any) {
    console.log("[GET_SCHOLARSHIP_REGISTERED_DATE", error);
    return { registeredDate: null, error };
  }
};
