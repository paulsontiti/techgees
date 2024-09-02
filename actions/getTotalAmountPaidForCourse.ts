import { db } from "@/lib/db";


interface ReturnValue{
    totalAmountPaid:number,
    error:Error | null
}


export const getTotalAmountPaidForCourse = async(userId:string,courseId:string):
Promise<ReturnValue>=>{
    try{
        const payments = await db.paystackPayment.findMany({
            where:{
                userId,
                courseId
            },select:{
                amount:true
            }
        });
        
        const paymentAmounts = payments.map(payment => payment.amount)
        console.log(paymentAmounts.length)
        
        const totalAmountPaid = paymentAmounts.length === 0 ? 0 : paymentAmounts.reduce((total,curr)=> total+curr)
        

      return {totalAmountPaid,error:null}
    }catch(error:any){
    
        return {totalAmountPaid:0,error}
    }
    }