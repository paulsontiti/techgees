import { db } from "@/lib/db";
import { verifyPayStackPayment } from "./verifyPayment";


interface ReturnValue {
    totalAmountPaid: number,
    error: Error | null
}


export const getTotalAmountPaidForCourse = async (userId: string, courseId: string):
    Promise<ReturnValue> => {
    try {
        const payments = await db.paystackPayment.findMany({
            where: {
                userId,
                courseId
            },select:{
                reference:true,
                amount:true
            }
        });

        let paymentAmounts:number[] = []

      for(let payment of payments){
        const {verifiedPayment,error} = await verifyPayStackPayment(payment.reference)
        if(!error){
            if(verifiedPayment.data.status === "success"){
                paymentAmounts.push(payment.amount)


                await db.paystackPayment.update({
                    where:{
                        reference:payment.reference
                    },
                    data:{
                        payment_status:verifiedPayment.data.status
                    }
                })
            }
        }
            
      }

        const totalAmountPaid = paymentAmounts.length === 0 ? 0 : paymentAmounts.reduce((total, curr) => total + curr)


        return { totalAmountPaid, error: null }
    } catch (error: any) {
        console.log("TOTAL_AMOUNT_PAID",error)
        return { totalAmountPaid: 0, error }
    }
}