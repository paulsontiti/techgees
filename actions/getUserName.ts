import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue {
  userName: string;
  error: Error | null;
}
/**
 * Fetches a user by userId.
 * 

 * @param {string} userId - The clerk id of the user.
 * @return {ReturnValue} The user or error.
 */
export const getUserName = async (): Promise<ReturnValue> => {
  try {
    const userId = await getUserCookie();
    const user = await db.dBUser.findFirst({
      where: {
        userId,
      },select:{
        userName:true
      }
    });

    const userName = user?.userName || "";

    return { userName, error: null };
  } catch (error: any) {
    console.log("[USERNAME]", error);
    return { userName:"", error };
  }
};
