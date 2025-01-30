import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request, {
    params: { paystackPaymentId }
}: {
    params: { paystackPaymentId: string }
}) {

    try {
        const payment = await db.paystackPayment.findUnique({

            where: {
                id: paystackPaymentId
            }, select: {
                amount:true
            }
        })

       
        return NextResponse.json(payment?.amount);
    } catch (err) {

        console.log("[GET_PAYMENT_AMOUNT]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}