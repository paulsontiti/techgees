import { db } from "@/lib/db";
import { verifyPayStackPayment } from "./verifyPayment";


interface ReturnValue {
    success: boolean,
    error: Error | null
}


export const updatePayment = async (reference: string):
    Promise<ReturnValue> => {
    try {


        const { verifiedPayment, error } = await verifyPayStackPayment(reference)
        if (error) throw new Error(error.message)

        if (verifiedPayment.data.status === "success") {
            await db.paystackPayment.update({
                where: {
                    reference
                },
                data: {
                    payment_status: verifiedPayment.data.status
                }
            })
        }


        return { success: true, error: null }
    } catch (error: any) {

        return { success: false, error }
    }
}