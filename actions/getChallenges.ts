import { db } from "@/lib/db";
import { Challenge } from "@prisma/client";

interface ReturnValue {
    challenges: Challenge[],
    error: Error | null
}
/**
 * Gets all challenges.
 * 

 * 
 * @return {ReturnValue} Challenges or error.
 */
export const getChallenges = async ():
    Promise<ReturnValue> => {
    try {
        const challenges = await db.challenge.findMany({
            where:{
                isPublished:true
            }
        });

       

        return { challenges, error: null }
    } catch (error: any) {
        console.log("[GET_CHALLENGES]", error)
        return { challenges: [], error }
    }
}