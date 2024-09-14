import { db } from "@/lib/db";
import { Purchase } from "@prisma/client";

type ReturnValue ={
  coursePurchase:Purchase | null,
  error:Error | null
}

export const getCoursePurchase = async(courseId:string,userId:string,):
Promise<ReturnValue>=>{
    try{


    const coursePurchase = await db.purchase.findUnique({
      where:{
        courseId_userId:{
          userId,courseId
        }
      }
    })


      return {coursePurchase,error:null}
    }catch(error:any){
    
        return {coursePurchase:null,error}
    }
    }