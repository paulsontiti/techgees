import { Leaderboard } from "@/app/(free)/free-52-weeks/_components/weeks";
import { db } from "@/lib/db";
import { getReferees } from "./getReferees";
import { hasCompletedASession } from "./hasCompletedASession";
import { getDescendants } from "./getDescendants";

interface ReturnValue {
  leaderBoards: Leaderboard[];
  error: Error | null;
}

export const getRefereesLeaderBoards = async (): Promise<ReturnValue> => {
  try {
    let students = await db.dBUser.findMany({
      select: {
        id: true,
        userName: true,
        email: true,
        imageUrl:true
      },
    });

    const leaderBoards = await Promise.all(
      students.map(async (student) => {
        const referees = await getReferees(student.id);
        const returnReferees = referees.referees;

        if (returnReferees.length > 0) {
          const refsCompleted = await Promise.all(
            returnReferees.map(async (referee) => {
              const com = await hasCompletedASession(referee.userId);
              if (com) return referee;
            })
          );
         const points = refsCompleted.filter((r) => r !== undefined).length
        // let descs = await getDescendants(student.id)
        //   const descendantsCompletedAWeek = await Promise.all(descs.map(async(d) =>{
        //     const completedASession = await hasCompletedASession(d.userId)
        
        //     if(completedASession) return d
        //   }))
        
        //   descs = descendantsCompletedAWeek.filter( d => !!d)
        //   const points = descs.length
        //   if(points > 0)
        //   return {
        //     id: student.id,
        //     imageUrl:student.imageUrl || "",
        //     userName: student.userName || student.email!,
        //     points
        //   };
        }
      })
    );

    return {
      leaderBoards: leaderBoards.filter((leader) => leader !== undefined),
      error: null,
    };
  } catch (error: any) {
    console.log("[GET_REFEREES_LEADERBOARDS]", error);
    return { leaderBoards: [], error };
  }
};
