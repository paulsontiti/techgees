import { db } from "@/lib/db";

interface ReturnValue{
    hasDisLiked:boolean,
    error:Error | null
}

export const hasDisLikedChapter = async(
    chapterId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const dislike = await db.disLike.findUnique({
    where:{
        userId_chapterId:{
            userId,chapterId
        }
    }
})

      return {hasDisLiked:!!dislike,error:null}
    }catch(error:any){
    console.log("[GET_HAS_DISLIKE_CHAPTER]",error)
        return {hasDisLiked:false,error}
    }
    }