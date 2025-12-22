import { db } from "@/lib/db";
import { DBUser } from "@prisma/client";

/**
 * Fetches all the descendants of a user.
 * 

 * @param {string} userId - The user id of the referer.
 */
export const getDescendants = async (userId: string): Promise<DBUser[]> => {
  try {
    
    const referees = await db.dBUser.findMany({
      where: {
        refererId: userId,
      },
    });
    if (referees.length === 0) {
      return referees;
    }
    const descendants = await Promise.all(
      referees.map((ref) => getDescendants(ref.id))
    );

    return [...referees, ...descendants.flat()];

  } catch (error: any) {
    console.log("[DESCENDANTS]", error);
    return [];
  }
};
