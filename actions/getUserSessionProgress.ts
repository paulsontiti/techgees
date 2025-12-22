import { db } from "@/lib/db";
interface ReturnValue {
    userHasCompletedThisSession: boolean,
    error: Error | null
}
/**
 * Checks if a student has completed a session.
 * 

 * @param {string} userId - The student's userId
@param {string} sessionId - The session Id
 * @return {ReturnValue} boolean or error.
 */
export const getUserSessionProgress = async (
    userId:string,sessionId:string):
    Promise<ReturnValue> => {
    try {
       
      const userProgress = await db.userProgress.findFirst({
        where:{
            userId,
            sessionId
        }
      })

        return { userHasCompletedThisSession : !!userProgress, error: null }
    } catch (error: any) {
        console.log("[USER_HAS_COMPLETED_THIS_SESSION]", error)
        return { userHasCompletedThisSession: false, error }
    }
}