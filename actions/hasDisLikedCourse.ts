import { db } from "@/lib/db";

interface ReturnValue{
    hasDisLiked:boolean,
    error:Error | null
}

export const hasDisLikedCourse = async(
    courseId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const dislike = await db.disLike.findFirst({
    where:{
            userId,courseId
        
    }
})

      return {hasDisLiked:!!dislike,error:null}
    }catch(error:any){
    console.log("[GET_HAS_DISLIKE_COURSE]",error)
        return {hasDisLiked:false,error}
    }
    }