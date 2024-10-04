import { db } from "@/lib/db";

interface ReturnValue {
    isCombo: boolean | null,
    error: Error | null
}
/**
 * Checks if a course is a combo course.
 * 

 * @param {string} courseId - The id of the course.
 * @return {ReturnValue} Boolean or error.
 */
export const isCourseCombo = async (
    courseId: string):
    Promise<ReturnValue> => {
    try {
        const courseWithChildren = await db.courseChild.findMany({
            where: {
                parentCourseId: courseId,
            },
        });

        const isCombo = courseWithChildren.length > 0;

        return { isCombo, error: null }
    } catch (error: any) {
        console.log("[IS_COURSE_COMBO]", error)
        return { isCombo: null, error }
    }
}