import { db } from "@/lib/db";

interface ReturnValue{
    numberOfDisLikes:number | null,
    error:Error | null
}

export const getSessionDisLikesCount = async(sessionId:string):
Promise<ReturnValue>=>{
    try{
const likes = await db.disLike.count({
    where:{
        sessionId,
    }
})

      return {numberOfDisLikes:likes,error:null}
    }catch(error:any){
    console.log("[GET_SESSION_DISLIKES_COUNT]",error)
        return {numberOfDisLikes:null,error}
    }
    }