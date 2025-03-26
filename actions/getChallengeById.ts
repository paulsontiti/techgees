import { db } from "@/lib/db";
import { Challenge } from "@prisma/client";

interface ReturnValue {
    challenge: Challenge | null,
    error: Error | null
}
/**
 * Gets a challenge by id.
 * 
* @param {string} challengeId - The id of the challenge.
 * @return {ReturnValue} challenge or error.
 */
export const getChallengeId = async (challengeId:string):
    Promise<ReturnValue> => {
    try {
        const challenge = await db.challenge.findUnique({
            where:{
                id:challengeId
            }
        });

       

        return { challenge, error: null }
    } catch (error: any) {
        console.log("[GET_ChallengeId]", error)
        return { challenge: null, error }
    }
}