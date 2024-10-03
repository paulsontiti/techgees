import { db } from "@/lib/db";
import { UserProgress } from "@prisma/client";



interface ReturnValue {
    userChapterProgress: UserProgress | null,
    error: Error | null
}


/**
 * Fetches a user's previous chapter progress by userId.
 * 

 * @param {string} userId - The clerk id of the user.
@param {string} chapterId - The chapter id.
 * @return {ReturnValue} The user progress or error.
 */

export const getUserChapterProgress = async (userId: string, chapterId: string):
    Promise<ReturnValue> => {
    try {

        const userChapterProgress = await db.userProgress.findFirst({
            where: {
                userId,
                chapterId
            }
        })

        return { userChapterProgress, error: null }
    } catch (error: any) {
        console.log("[GET_CHAPTER_USER_PROGRESS]", error)
        return { userChapterProgress: null, error }
    }
}