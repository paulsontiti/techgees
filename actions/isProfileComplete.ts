
import { getUserCookie } from "@/lib/get-user-cookie";
import { getUser } from "./getUser";

interface ReturnValue {
    isComplete: boolean,
    error: Error | null
}
/**
 * Checks if a profile is complete.
 * @return {ReturnValue} boolean or error.
 */
export const isProfileComplete = async ():
    Promise<ReturnValue> => {
    try {
        const userId = await getUserCookie();

       const {user} = await getUser(userId || "");
       
       if(!user) return { isComplete:false, error: null }
       
         const requiredFields = [
           user?.firstName,
           user?.lastName,
           user?.email,
           user?.phone,
           user?.whatsapp,
           user?.userName,
           user?.refererId
         ];
       
    
         const isComplete = requiredFields.every(Boolean)

        return { isComplete, error: null }
    } catch (error: any) {
        console.log("[IS_PROFILE_COMPLETE]", error)
        return { isComplete: false, error }
    }
}