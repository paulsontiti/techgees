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
            }
        });

        const paymentAmounts = payments.filter((payment) => payment.payment_status !== "success").map(payment => payment.amount)

        const totalAmountPaid = paymentAmounts.length === 0 ? 0 : paymentAmounts.reduce((total, curr) => total + curr)


        return { totalAmountPaid, error: null }
    } catch (error: any) {

        return { totalAmountPaid: 0, error }
    }
}