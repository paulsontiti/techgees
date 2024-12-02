import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

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
        const user = await currentUser();
        if(!user) return { isCourseCreator : false, error: null }
        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId:user.id,
            },
          });
      
        return { isCourseCreator : course ? true : false, error: null }
    } catch (error: any) {
        console.log("[IS_COURSE_OWNER]", error)
        return { isCourseCreator: false, error }
    }
}