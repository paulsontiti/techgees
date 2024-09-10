import { db } from "@/lib/db";

interface ReturnValue{
    hasDisLiked:boolean,
    error:Error | null
}

export const hasDisLikedSession = async(
    sessionId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const dislike = await db.disLike.findFirst({
    where:{
            userId,sessionId
    }
})

      return {hasDisLiked:!!dislike,error:null}
    }catch(error:any){
    console.log("[GET_HAS_DISLIKE_SESSION]",error)
        return {hasDisLiked:false,error}
    }
    }