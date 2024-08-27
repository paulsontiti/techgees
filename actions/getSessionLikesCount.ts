import { db } from "@/lib/db";

interface ReturnValue{
    numberOfLikes:number | null,
    error:Error | null
}

export const getSessionLikesCount = async(sessionId:string):
Promise<ReturnValue>=>{
    try{
const likes = await db.like.count({
    where:{
        sessionId,
    }
})

      return {numberOfLikes:likes,error:null}
    }catch(error:any){
    console.log("[GET_SESSION_LIKES_COUNT]",error)
        return {numberOfLikes:null,error}
    }
    }