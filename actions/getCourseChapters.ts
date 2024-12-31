import { db } from "@/lib/db";
import { Chapter } from "@prisma/client";

interface ReturnValue {
    chapters: Chapter[],
    error: Error | null
}
/**
 * Returns all the chapters of a course.
 * @param {string} courseId - the course id
 * @return {ReturnValue} array of chapters or error.
 */
export const getCourseChapters = async (courseId:string):
    Promise<ReturnValue> => {
    try {
      const chapters = await db.chapter.findMany({
        where:{
            courseId
        },
        orderBy:{
            position:"asc"
        }
      })

     

        return { chapters, error: null }
    } catch (error: any) {
        console.log("[CHAPTER_TITLES]", error)
        return { chapters: [], error }
    }
}