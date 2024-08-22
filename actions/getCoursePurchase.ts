import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";


interface ReturnValue{
    purchase:Purchase | null,
    error:Error | null
}


export const getCoursePurchaseByUserId = async(userId:string,courseId:string):
Promise<ReturnValue>=>{
    try{
        const purchase = await db.purchase.findUnique({
            where:{
                userId_courseId:{
                    userId,courseId
                }
            }
        });
      return {purchase,error:null}
    }catch(error:any){
    
        return {purchase:null,error}
    }
    }