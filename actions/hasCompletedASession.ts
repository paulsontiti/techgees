import { db } from "@/lib/db";
interface ReturnValue {
    completedASession: boolean,
    error: Error | null
}
/**
 * Checks if a student has completed a session.
 * 

 * @param {string} userId - The student's userId
 * @return {ReturnValue} boolean or error.
 */
export const hasCompletedASession = async (
    userId:string):
    Promise<ReturnValue> => {
    try {
       
      const userProgress = await db.userProgress.findFirst({
        where:{
            userId,
            sessionId: {
                not:null
            }
        }
      })

        return { completedASession : !!userProgress, error: null }
    } catch (error: any) {
        console.log("[HAS_COMPLETED_A_SESSION]", error)
        return { completedASession: false, error }
    }
}