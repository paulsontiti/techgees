import { db } from "@/lib/db";
import { Chapter, Session } from "@prisma/client";

interface ReturnValue {
    chapters: (Chapter & {sessions:Session[]})[],
    error: Error | null
}
/**
 * Returns all the chapters of a course.
 * @param {string} courseId - the course id
 * @return {ReturnValue} array of chapters or error.
 */
export const getCourseChaptersWithSessions = async (courseId:string):
    Promise<ReturnValue> => {
    try {
      const chapters = await db.chapter.findMany({
        where:{
            courseId
        },
        include:{
            sessions:true
        },
        orderBy:{
            position:"asc"
        }
      })

     

        return { chapters, error: null }
    } catch (error: any) {
        console.log("[COURSE_CHAPTERS_WITH_SESSIONS]", error)
        return { chapters: [], error }
    }
}