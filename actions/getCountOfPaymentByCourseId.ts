import { db } from "@/lib/db";


interface ReturnValue{
    numberOfPayments:number,
    error:Error | null
}


export const getCountOfPaymentByCourseId = async(courseId:string):
Promise<ReturnValue>=>{
    try{
        const numberOfPayments = await db.purchase.count({
            where:{
                courseId
            }
        });
      return {numberOfPayments,error:null}
    }catch(error:any){
    
        return {numberOfPayments:0,error}
    }
    }