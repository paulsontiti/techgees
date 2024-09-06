import { db } from "@/lib/db";
import { Comment } from "@prisma/client";

interface ReturnValue{
    comments:Comment[],
    error:Error | null
}

export const getCourseComments = async(courseId:string):
Promise<ReturnValue>=>{
    try{
const comments = await db.comment.findMany({
    where:{
        courseId,
    }
})

      return {comments,error:null}
    }catch(error:any){
    console.log("[GET_COURSE_COMMENTS]",error)
        return {comments:[],error}
    }
    }