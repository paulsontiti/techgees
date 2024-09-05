import { db } from "@/lib/db";

interface ReturnValue{
    hasLiked:boolean,
    error:Error | null
}

export const hasLikedChapter = async(
    chapterId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const like = await db.like.findUnique({
    where:{
        userId_chapterId:{
            userId,chapterId
        }
    }
})

      return {hasLiked:!!like,error:null}
    }catch(error:any){
    console.log("[HAS_LIKED_CHAPTER]",error)
        return {hasLiked:false,error}
    }
    }