import { db } from "@/lib/db";
import { Challenge } from "@prisma/client";

interface ReturnValue {
    challenges: Challenge[],
    error: Error | null
}
/**
 * Gets all challenges by a user.
 * 

 * @param {string} userId - The userId of the user.
 * @return {ReturnValue} Boolean or error.
 */
export const getChallengesByUserId = async (userId:string):
    Promise<ReturnValue> => {
    try {
        const challenges = await db.challenge.findMany({
            where:{
                userId
            }
        });

       

        return { challenges, error: null }
    } catch (error: any) {
        console.log("[GET_CHALLENGES_BY_USERID]", error)
        return { challenges: [], error }
    }
}