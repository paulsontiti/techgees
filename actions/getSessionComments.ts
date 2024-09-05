import { db } from "@/lib/db";
import { Comment } from "@prisma/client";

interface ReturnValue{
    comments:Comment[],
    error:Error | null
}

export const getSessionComments = async(sessionId:string):
Promise<ReturnValue>=>{
    try{
const comments = await db.comment.findMany({
    where:{
        sessionId,
    }
})

      return {comments,error:null}
    }catch(error:any){
    console.log("[GET_SESSION_COMMENTS]",error)
        return {comments:[],error}
    }
    }