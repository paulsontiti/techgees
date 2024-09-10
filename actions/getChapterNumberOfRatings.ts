import { db } from "@/lib/db";

interface ReturnValue{
    numberOfRatings:number,
    error:Error | null
}

export const getChapterNumberOfRatings = async(
    chapterId:string):
Promise<ReturnValue>=>{
    try{
const numberOfRatings = await db.rating.count({
    where:{
        chapterId
        }
    
})



      return {numberOfRatings,error:null}
    }catch(error:any){
    console.log("[CHAPTER_NUMBER_OF_RATING]",error)
        return {numberOfRatings:0,error}
    }
    }