import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { DBUser } from "@prisma/client";

interface ReturnValue{
    user:DBUser | null,
    error:Error | null
}
/**
 * Fetches a user by userId.
 * 

 * @param {string} userId - The clerk id of the user.
 * @return {ReturnValue} The user or error.
 */
export const getUser = async():
Promise<ReturnValue>=>{
    try{
        const userId = await getUserCookie();
const user = await db.dBUser.findFirst({
    where:{
        userId,
        }
    
})


      return {user,error:null}
    }catch(error:any){
    console.log("[USER]",error)
        return {user:null,error}
    }
    }