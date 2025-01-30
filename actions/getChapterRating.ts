import { db } from "@/lib/db";

interface ReturnValue{
    averageRating:number,
    error:Error | null
}

export const getChapterRating = async(
    chapterId:string):
Promise<ReturnValue>=>{
    try{
const ratings = await db.rating.aggregate({
    _avg:{
        value:true
    },
    where:{
        chapterId
        }
    
})

// const rating = ratings.map((rating)=> rating.value)
// const averageRating =!!rating.length ?
// rating.reduce((total,curr)=> total + curr)/ratings.length : 0

      return {averageRating:ratings._avg.value ?? 0,error:null}
    }catch(error:any){
    console.log("[CHAPTER_AVG_RATING]",error)
        return {averageRating:0,error}
    }
    }