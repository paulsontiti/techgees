import { db } from "@/lib/db";

interface ReturnValue{
    numberOfDisLikes:number,
    error:Error | null
}

export const getChapterDisLikesCount = async(chapterId:string):
Promise<ReturnValue>=>{
    try{
const numberOfDisLikes = await db.disLike.count({
    where:{
        chapterId,
    }
})

      return {numberOfDisLikes,error:null}
    }catch(error:any){
    console.log("[GET_CHAPTER_DISLIKES_COUNT]",error)
        return {numberOfDisLikes:0,error}
    }
    }