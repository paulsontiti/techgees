import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue {
    isCourseCreator: boolean,
    error: Error | null
}
/**
 * Checks if a user created a course.
 * @param {string} courseId - id of the course 
 * @return {ReturnValue} boolean or error.
 */
export const isCourseOwner = async (courseId:string):
    Promise<ReturnValue> => {
    try {
        const userId = await getUserCookie()
        if(!userId) return { isCourseCreator : false, error: null }
        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId,
            },
          });
      
        return { isCourseCreator : course ? true : false, error: null }
    } catch (error: any) {
        console.log("[IS_COURSE_OWNER]", error)
        return { isCourseCreator: false, error }
    }
}