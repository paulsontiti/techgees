import { db } from "@/lib/db";
import { getReferees } from "./getReferees";
import { hasCompletedASessionWithinAPeriod } from "./hasCompletedASessionWithAPeriod";
import { DBUser } from "@prisma/client";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue {
  referees: DBUser[];
  error: Error | null;
}

export const getRefereesWithinAPeriod = async (
  startDate: Date,
  endDate: Date
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
          const com = await hasCompletedASessionWithinAPeriod(
            referee.userId,
            startDate,
            endDate
          );
          if (com) return referee;
        })
      );
      const refs = refsCompleted.filter((r) => r !== undefined);

      return { referees: refs, error: null };
    }
    return { referees: [], error: null };
  } catch (error: any) {
    console.log("[GET_REFEREES_WITHIN_A_PERIOD]", error);
    return { referees: [], error };
  }
};
