import { db } from "@/lib/db";

interface ReturnValue{
    hasLiked:boolean,
    error:Error | null
}

export const hasLikedSession = async(
    sessionId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const like = await db.like.findUnique({
    where:{
        userId_sessionId:{
            userId,sessionId
        }
    }
})

      return {hasLiked:!!like,error:null}
    }catch(error:any){
    console.log("[HAS_LIKED_SESSION]",error)
        return {hasLiked:false,error}
    }
    }