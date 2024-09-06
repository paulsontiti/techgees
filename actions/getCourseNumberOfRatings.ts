import { db } from "@/lib/db";

interface ReturnValue{
    numberOfRatings:number,
    error:Error | null
}

export const getCourseNumberOfRatings = async(
    courseId:string):
Promise<ReturnValue>=>{
    try{
const numberOfRatings = await db.rating.count({
    where:{
        courseId
        }
    
})



      return {numberOfRatings,error:null}
    }catch(error:any){
    console.log("[COURSE_NUMBER_OF_RATING]",error)
        return {numberOfRatings:0,error}
    }
    }