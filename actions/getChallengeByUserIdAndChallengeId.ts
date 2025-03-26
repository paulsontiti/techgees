import { db } from "@/lib/db";
import { Challenge } from "@prisma/client";

interface ReturnValue {
    challenge: Challenge | null,
    error: Error | null
}
/**
 * Gets a challenge by a userId and challengeId.
 * 

 * @param {string} userId - The userId of the user.
* @param {string} challengeId - The userId of the user.
 * @return {ReturnValue} Boolean or error.
 */
export const getChallengesByUserIdAndChallengeId = async (userId:string,challengeId:string):
    Promise<ReturnValue> => {
    try {
        const challenge = await db.challenge.findUnique({
            where:{
                userId,
                id:challengeId
            }
        });

       

        return { challenge, error: null }
    } catch (error: any) {
        console.log("[GET_CHALLENGES_BY_USERID_And_ChallengeId]", error)
        return { challenge: null, error }
    }
}