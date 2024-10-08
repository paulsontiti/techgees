import { db } from "@/lib/db";
import { Comment } from "@prisma/client";

interface ReturnValue{
    numberOfComments:number,
    error:Error | null
}

export const getSessionCommentsCount = async(sessionId:string):
Promise<ReturnValue>=>{
    try{
const numberOfComments = await db.comment.count({
    where:{
        sessionId,
    }
})

      return {numberOfComments,error:null}
    }catch(error:any){
    console.log("[GET_SESSION_COMMENTS]",error)
        return {numberOfComments:0,error}
    }
    }