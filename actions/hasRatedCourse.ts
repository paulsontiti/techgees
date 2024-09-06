import { db } from "@/lib/db";

interface ReturnValue{
    hasRated:boolean,
    error:Error | null
}

export const hasRatedCourse = async(
    courseId:string,userId:string):
Promise<ReturnValue>=>{
    try{
const rating = await db.rating.findFirst({
    where:{
            userId,courseId
    }
})

      return {hasRated:!!rating,error:null}
    }catch(error:any){
    console.log("[HAS_RATED_COURSE]",error)
        return {hasRated:false,error}
    }
    }