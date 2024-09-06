import { db } from "@/lib/db";

interface ReturnValue{
    hasLiked:boolean,
    error:Error | null
}

export const hasLikedCourse = async(
    courseId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const like = await db.like.findFirst({
    where:{
       userId,courseId
    }
})

      return {hasLiked:!!like,error:null}
    }catch(error:any){
    console.log("[HAS_LIKED_COURSE]",error)
        return {hasLiked:false,error}
    }
    }