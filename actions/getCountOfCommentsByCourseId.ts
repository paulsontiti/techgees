import { db } from "@/lib/db";


interface ReturnValue{
    numberOfComments:number,
    error:Error | null
}


export const getCountOfCommentsByCourseId = async(courseId:string):
Promise<ReturnValue>=>{
    try{
        const numberOfComments = await db.comment.count({
            where:{
                courseId
            }
        });
      return {numberOfComments,error:null}
    }catch(error:any){
    
        return {numberOfComments:0,error}
    }
    }