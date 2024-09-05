import { db } from "@/lib/db";
import { Comment } from "@prisma/client";

interface ReturnValue{
    comments:Comment[],
    error:Error | null
}

export const getChapterComments = async(chapterId:string):
Promise<ReturnValue>=>{
    try{
const comments = await db.comment.findMany({
    where:{
        chapterId,
    }
})

      return {comments,error:null}
    }catch(error:any){
    console.log("[GET_CHAPTER_COMMENTS]",error)
        return {comments:[],error}
    }
    }