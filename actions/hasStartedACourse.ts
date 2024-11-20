import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

interface ReturnValue {
    startedCourse: boolean | null,
    error: Error | null
}
/**
 * Checks if a student has started a course.
 * 

 * 
 * @param {string} courseId - The course to check for.
 * @return {ReturnValue} boolean or error.
 */
export const hasStartedACourse = async (
    courseId:string):
    Promise<ReturnValue> => {
    try {
        const user = await currentUser();
      const course = await db.purchase.findFirst({
        where:{
            userId:user?.id,courseId
        }
      })
       

        return { startedCourse : course ? true : false, error: null }
    } catch (error: any) {
        console.log("[HAS_STARTED_A_COURSE]", error)
        return { startedCourse: null, error }
    }
}