import { db } from "@/lib/db";

interface ReturnValue{
    numberOfStudents:number,
    error:Error | null
}

export const getCourseStudentsCount = async(courseId:string):
Promise<ReturnValue>=>{
    try{
const numberOfStudents = await db.userProgress.count({
    where:{
        courseId,
    }
})

      return {numberOfStudents,error:null}
    }catch(error:any){
    console.log("[GET_COURSE_STUDENTS]",error)
        return {numberOfStudents:0,error}
    }
    }