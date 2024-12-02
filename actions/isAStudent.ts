import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

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
        const user = await currentUser();
        if(!user) return { isStudent : false, error: null }
      const course = await db.purchase.findFirst({
        where:{
            userId:user?.id
        }
      })
       

        return { isStudent : course ? true : false, error: null }
    } catch (error: any) {
        console.log("[IS_A_STUDENT]", error)
        return { isStudent: false, error }
    }
}