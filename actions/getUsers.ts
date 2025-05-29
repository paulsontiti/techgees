import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue{
    referers:{id:string,userName:string}[],
    error:Error | null
}
/**
 * Fetches users.
 * 
 * @return {ReturnValue} The users or error.
 */
export const getUsersForReferal = async():
Promise<ReturnValue>=>{
    try{
        const userId = await getUserCookie();
const users = await db.dBUser.findMany({
    where:{
        userId: {
            not: userId
        }
    },
    select:{
        id:true,
        userName:true
    }
})

const referers = users.filter(user=>user.userName !== null).map((user)=>{
    return {
        id:user.id,
        userName:user.userName ?? ""
    }
})
      return {referers,error:null}
    }catch(error:any){
    console.log("[REFERERS]",error)
        return {referers:[],error}
    }
    }