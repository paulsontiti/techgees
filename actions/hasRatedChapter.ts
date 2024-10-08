import { db } from "@/lib/db";

interface ReturnValue{
    hasRated:boolean,
    error:Error | null
}

export const hasRatedChapter = async(
    chapterId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const rating = await db.rating.findFirst({
    where:{
            userId,chapterId
        
    }
})

      return {hasRated:!!rating,error:null}
    }catch(error:any){
    console.log("[HAS_RATED_CHAPTER]",error)
        return {hasRated:false,error}
    }
    }