import { db } from "@/lib/db";

interface ReturnValue{
    averageRating:number,
    error:Error | null
}

export const getSessionRating = async(
    sessionId:string):
Promise<ReturnValue>=>{
    try{
const ratings = await db.rating.aggregate({
    _avg:{
        value:true
    },
    where:{
        sessionId
        }
    
})



      return {averageRating:ratings._avg.value ?? 0,error:null}
    }catch(error:any){
    console.log("[SESSION_RATING]",error)
        return {averageRating:0,error}
    }
    }