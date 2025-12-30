import { db } from "@/lib/db";
import { getReferees } from "./getReferees";
import { DBUser } from "@prisma/client";
import { getUserCookie } from "@/lib/get-user-cookie";
import { hasCompletedASession } from "./hasCompletedASession";

interface ReturnValue {
  refereesWithASession: DBUser[];
  error: Error | null;
}

export const getRefereesWithASession = async (
): Promise<ReturnValue> => {
  try {
    const userId = (await getUserCookie()) || "";
    let student = await db.dBUser.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const referees = await getReferees(student?.id ?? "");
    const returnReferees = referees.referees;
  

    if (returnReferees.length > 0) {
      const refsCompleted = await Promise.all(
        returnReferees.map(async (referee) => {
          const com = await hasCompletedASession(
            referee.userId
          );
          if (com) return referee;
        })
      );
      const refs = refsCompleted.filter((r) => r !== undefined);
      

      return { refereesWithASession: refs, error: null };
    }
    return { refereesWithASession: [], error: null };
  } catch (error: any) {
    console.log("[GET_REFEREES_WITH_A_SESSION]", error);
    return { refereesWithASession: [], error };
  }
};
