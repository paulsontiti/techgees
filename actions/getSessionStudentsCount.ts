import { db } from "@/lib/db";

interface ReturnValue{
    numberOfStudents:number,
    error:Error | null
}

export const getSessionStudentsCount = async(sessionId:string):
Promise<ReturnValue>=>{
    try{
const numberOfStudents = await db.userProgress.count({
    where:{
        sessionId,
    }
})

      return {numberOfStudents,error:null}
    }catch(error:any){
    console.log("[GET_SESSION_STUDENTS]",error)
        return {numberOfStudents:0,error}
    }
    }