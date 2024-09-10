import { db } from "@/lib/db";

interface ReturnValue{
    hasRated:boolean,
    error:Error | null
}

export const hasRatedSession = async(
    sessionId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const rating = await db.rating.findFirst({
    where:{
            userId,sessionId
        }
    
})

      return {hasRated:!!rating,error:null}
    }catch(error:any){
    console.log("[HAS_RATED_SESSION]",error)
        return {hasRated:false,error}
    }
    }