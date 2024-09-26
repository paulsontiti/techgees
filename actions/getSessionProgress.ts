import { db } from "@/lib/db";
import { UserProgress } from "@prisma/client";

interface ReturnValue{
    sessionProgress:UserProgress | null,
    error:Error | null
}
/**
 * Fetches the user progress of a session.
 * 
 * @param {string} sessionId - The id of the session.
 * @param {string} userId - The id of the user.
 * @return {UserProgress} The user progress for the session.
 */
export const getSessionProgress = async(
    sessionId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const sessionProgress = await db.userProgress.findFirst({
    where:{
        userId,
        sessionId
        }
    
})


      return {sessionProgress,error:null}
    }catch(error:any){
    console.log("[SESSION_PROGRESS]",error)
        return {sessionProgress:null,error}
    }
    }