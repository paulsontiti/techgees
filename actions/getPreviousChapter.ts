import { db } from "@/lib/db";

interface ReturnValue {
    previousChapter: {id:string} | null,
    error: Error | null
}


/**
 * Fetches previous chapter.
 * 

 *
@param {string} chapterId - The chapter id.
@param {string} courseId - The course id.
 * @return {ReturnValue} The user progress or error.
 */

export const getPreviousChapter = async (chapterId: string, courseId: string):
    Promise<ReturnValue> => {
    try {
        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            }, select: {
                position: true,
                // questions: true,
                // assignments: true
            }
        });
     
        //get the previous session position
        const prvPosition = chapter ? chapter.position - 1 : 0;

        const previousChapter = await db.chapter.findFirst({
            where: {
                courseId,
                isPublished: true,
                position: prvPosition
            },
            select:{id:true},
            orderBy: {
                position: "asc"
            }
        })
               return { previousChapter, error: null }
    } catch (error: any) {
        console.log("[GET_PREVIOUS_CHAPTER]", error)
        return { previousChapter: null, error }
    }
}