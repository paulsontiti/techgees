import { db } from "@/lib/db";

interface ReturnValue{
    numberOfLikes:number,
    error:Error | null
}

export const getCourseLikesCount = async(courseId:string):
Promise<ReturnValue>=>{
    try{
const likes = await db.like.count({
    where:{
        courseId,
    }
})

      return {numberOfLikes:likes,error:null}
    }catch(error:any){
    console.log("[GET_COURSE_LIKES_COUNT]",error)
        return {numberOfLikes:0,error}
    }
    }