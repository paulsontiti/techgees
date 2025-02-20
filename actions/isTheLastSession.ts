import { db } from "@/lib/db";

interface ReturnValue {
    isLastSession: boolean,
    error: Error | null
}
/**
 * Checks if a session is the last session in the chapter.
 * @param {number} sessionPosition - the position of the session
 * @param {string} chapterId - the id of the chapter
 * @return {ReturnValue} boolean or error.
 */
export const isTheLastSession = async (chapterId:string,sessionPosition:number):
    Promise<ReturnValue> => {
    try {
      const chapter = await db.chapter.findUnique({
        where:{
            id:chapterId
        },
        include:{
            sessions:true
        }
      })

      const sessionPositions = chapter?.sessions ?
       chapter?.sessions.map((session)=> session.position) : [0];
       
      const isLast = Math.max(...sessionPositions) === sessionPosition;

        return { isLastSession : isLast, error: null }
    } catch (error: any) {
        console.log("[IS_THE_LAST_SESSION]", error)
        return { isLastSession: false, error }
    }
}