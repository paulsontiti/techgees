import { db } from "@/lib/db";

interface ReturnValue{
    numberOfDisLikes:number,
    error:Error | null
}

export const getCourseDisLikesCount = async(courseId:string):
Promise<ReturnValue>=>{
    try{
const numberOfDisLikes = await db.disLike.count({
    where:{
        courseId,
    }
})

      return {numberOfDisLikes,error:null}
    }catch(error:any){
    console.log("[GET_CHAPTER_DISLIKES_COUNT]",error)
        return {numberOfDisLikes:0,error}
    }
    }