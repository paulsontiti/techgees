import { db } from "@/lib/db";

interface ReturnValue {
    chapterTitles: string[],
    error: Error | null
}
/**
 * Returns all the chapter titles of a course.
 * @param {string} courseId - the course id
 * @return {ReturnValue} array of chapter titles or error.
 */
export const getCourseChaptersTitle = async (courseId:string):
    Promise<ReturnValue> => {
    try {
      const titles = await db.chapter.findMany({
        where:{
            courseId
        },
        select:{
            title:true
        },orderBy:{
            position:"asc"
        }
      })

      const chapterTitles = titles.map(chap => chap.title);

        return { chapterTitles, error: null }
    } catch (error: any) {
        console.log("[CHAPTER_TITLES]", error)
        return { chapterTitles: [], error }
    }
}