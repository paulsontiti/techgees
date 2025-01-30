import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { DBUser } from "@prisma/client";

interface ReturnValue {
    user: DBUser | null,
    error: Error | null
}
/**
 * Gets a user's details.
 
 * @return {ReturnValue} DBUser or error.
 */
export const getCurrentUser = async ():
    Promise<ReturnValue> => {
    try {
        const userId = await getUserCookie();
        if(!userId) return { user : null, error: new Error("Unauthorised user") }

      const user = await db.dBUser.findFirst({
        where:{
            userId
        }
      })
       

        return { user, error: null }
    } catch (error: any) {
        console.log("[CURRENT_USER]", error)
        return { user: null, error }
    }
}