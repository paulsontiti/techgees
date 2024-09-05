import { db } from "@/lib/db";

interface ReturnValue{
    averageRating:number,
    error:Error | null
}

export const getSessionRating = async(
    sessionId:string):
Promise<ReturnValue>=>{
    try{
const ratings = await db.rating.findMany({
    where:{
        sessionId
        },select:{value:true}
    
})

const rating = ratings.map((rating)=> rating.value)
const averageRating =!!rating.length ?
 rating.reduce((total,curr)=> total + curr)/ratings.length : 0

      return {averageRating,error:null}
    }catch(error:any){
    console.log("[SESSION_RATING]",error)
        return {averageRating:0,error}
    }
    }