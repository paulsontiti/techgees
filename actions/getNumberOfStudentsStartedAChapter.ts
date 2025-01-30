import { db } from "@/lib/db";

interface ReturnValue {
    numberOfStudents: number | null,
    error: Error | null
}
/**
 * Gets number of students that has completed the first session of a chapter.
 * @param {string} chapterId chapter id
 * @return {ReturnValue} number or error.
 */
export const getNumberOfStudentsStartedAChapter = async (chapterId:string):
    Promise<ReturnValue> => {
    try {
        //get the first session of the chapter
        const firstSession = await db.chapter.findUnique({
            where:{
                id:chapterId
            },select:{
                sessions:{
                    where:{
                        OR:[
                            {position:0},{position:1}
                        ]
                    }
                }
            }
        })

        const sessionId = firstSession?.sessions[0].id;

        const numberOfStudents = await db.userProgress.count({
            where:{
                sessionId
            }
        })

        return { numberOfStudents, error: null }
    } catch (error: any) {
        console.log("[GET_NUMBER_OF_STUDENTS_STARTED_A_CHAPTER]", error)
        return { numberOfStudents: null, error }
    }
}