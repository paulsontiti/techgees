import { db } from "@/lib/db";

interface ReturnValue{
    numberOfComments:number,
    error:Error | null
}

export const getChapterCommentsCount = async(chapterId:string):
Promise<ReturnValue>=>{
    try{
const numberOfComments = await db.comment.count({
    where:{
        chapterId,
    }
})

      return {numberOfComments,error:null}
    }catch(error:any){
    console.log("[GET_CHAPTER_COMMENTS_COUNT]",error)
        return {numberOfComments:0,error}
    }
    }