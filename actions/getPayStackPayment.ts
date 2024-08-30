import { db } from "@/lib/db";
import { PaystackPayment } from "@prisma/client";



interface ReturnValue{
    paystack:PaystackPayment | null,
    error:Error | null
}

export const getPayStackPayment = async(reference:string):
Promise<ReturnValue>=>{
    try{
        const paystack = await db.paystackPayment.findUnique({
            where:{
              reference
            }
          })

      return {paystack,error:null}
    }catch(error:any){
    console.log("[GET_PAYSTACK_PAYMENT]",error)
        return {paystack:null,error}
    }
    }