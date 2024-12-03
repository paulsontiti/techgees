import { db } from "@/lib/db";
interface ReturnValue {
    startedCourse: boolean | null,
    error: Error | null
}
/**
 * Checks if a student has started a course.
 * 

 * @param {string} userId - The student's userId
 * @param {string} courseId - The course to check for.
 * @return {ReturnValue} boolean or error.
 */
export const hasStartedACourse = async (
    userId:string,
    courseId:string):
    Promise<ReturnValue> => {
    try {
       
      const course = await db.purchase.findFirst({
        where:{
            userId,courseId
        }
      })
       

        return { startedCourse : course ? true : false, error: null }
    } catch (error: any) {
        console.log("[HAS_STARTED_A_COURSE]", error)
        return { startedCourse: null, error }
    }
}