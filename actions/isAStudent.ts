import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue {
    isStudent: boolean,
    error: Error | null
}
/**
 * Checks if a student has paid for any course.
 
 * @return {ReturnValue} boolean or error.
 */
export const isAStudent = async ():
    Promise<ReturnValue> => {
    try {
        const userId = await getUserCookie();
        if(!userId) return { isStudent : false, error: null }
      const course = await db.purchase.findFirst({
        where:{
            userId
        }
      })
       

        return { isStudent : course ? true : false, error: null }
    } catch (error: any) {
        console.log("[IS_A_STUDENT]", error)
        return { isStudent: false, error }
    }
}