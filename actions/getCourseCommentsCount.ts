import { db } from "@/lib/db";

interface ReturnValue{
    numberOfComments:number,
    error:Error | null
}

export const getCourseCommentsCount = async(courseId:string):
Promise<ReturnValue>=>{
    try{
const numberOfComments = await db.comment.count({
    where:{
        courseId,
    }
})

      return {numberOfComments,error:null}
    }catch(error:any){
    console.log("[GET_COURSE_COMMENTS_COUNT]",error)
        return {numberOfComments:0,error}
    }
    }