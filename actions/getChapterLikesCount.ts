import { db } from "@/lib/db";

interface ReturnValue{
    numberOfLikes:number,
    error:Error | null
}

export const getChapterLikesCount = async(chapterId:string):
Promise<ReturnValue>=>{
    try{
const likes = await db.like.count({
    where:{
        chapterId,
    }
})

      return {numberOfLikes:likes,error:null}
    }catch(error:any){
    console.log("[GET_CHAPTER_LIKES_COUNT]",error)
        return {numberOfLikes:0,error}
    }
    }