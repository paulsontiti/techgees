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
                userId: true
            }
        })

        const user = await db.dBUser.findUnique({
            where:{
                userId: payment?.userId
            }
        })
        const firstName = user?.firstName ?? "";
        const lastName = user?.lastName ?? ""
        const email = user?.email
        return NextResponse.json(firstName ? `${firstName} ${lastName ?? ""}` : email);
    } catch (err) {

        console.log("[GET_PAYEE_NAME]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}