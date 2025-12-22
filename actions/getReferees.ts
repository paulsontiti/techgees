import { db } from "@/lib/db";
import { DBUser } from "@prisma/client";
import { count } from "console";

interface ReturnValue {
  referees: DBUser[];
  error: Error | null;
}
/**
 * Fetches the referees of the a referer.
 * 

 * @param {string} userId - The user id of the referer.
 * @return {ReturnValue} The referees of the referer or error.
 */
export const getReferees = async (userId: string): Promise<ReturnValue> => {
  try {
    const referees = await db.dBUser.findMany({
      where: {
        refererId: userId,
      },
    });
  
    return {referees,error:null}
  } catch (error: any) {
    console.log("[REFEREES]", error);
    return {referees:[],error:null};
  }
};
