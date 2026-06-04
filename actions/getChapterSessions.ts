import { db } from "@/lib/db";

interface ReturnValue {
    sessions: { id:string,
            isPublished:boolean,
            chapterId:string,
            title:string}[],
    error: Error | null
}
/**
 * Returns all the sessions of a chapter.
 * @param {string} chapterId - the chapter id
 * @return {ReturnValue} array of sessions or error.
 */
export const getChaptersSessions = async (chapterId:string):
    Promise<ReturnValue> => {
    try {
      const sessions = await db.session.findMany({
        where:{
            chapterId
        },select:{
            id:true,
            isPublished:true,
            chapterId:true,
            title:true
        },
        orderBy:{
            position:"asc"
        }
      })

     

        return { sessions, error: null }
    } catch (error: any) {
        console.log("[CHAPTER_SESSION]", error)
        return { sessions: [], error }
    }
}