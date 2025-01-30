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
                course: {
                    select:{
                        title:true
                    }
                }
            }
        })

       
        return NextResponse.json(payment?.course.title);
    } catch (err) {

        console.log("[GET_PAYMENT_COURSE_TITLE]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}