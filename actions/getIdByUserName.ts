import { db } from "@/lib/db";

interface ReturnValue {
  id: string;
  error: Error | null;
}
/**
 * Fetches the id of a user.
 * 

 * @param {string} userName - The username of the user.
 * @return {ReturnValue} The id of the user or error.
 */
export const getIdByUserName = async (
  userName: string
): Promise<ReturnValue> => {
  try {
    const user = await db.dBUser.findFirst({
      where: {
        userName,
      },
      select: {
        id: true,
      },
    });

    const id = user?.id || "";
    return { id, error: null };
  } catch (error: any) {
    console.log("[GET_ID]", error);
    return { id: "", error };
  }
};
