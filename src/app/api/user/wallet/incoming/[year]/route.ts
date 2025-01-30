import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function GET(req: Request, {
    params: { year }
}: {
    params: { year: string }
}) {

    try {
        const userId = await getUserCookie();
        const wallet = await db.wallet.findUnique({
            where: {
                userId
            },select:{
                id:true
            }
        })

        const deposits = await db.walletDeposit.groupBy({
            by: 'month',
            _sum: {
                amount: true
            },
            where: {
                walletId: wallet?.id, year: parseInt(year)
            }, orderBy: {
                month: "asc"
            }
        })

        return NextResponse.json(deposits)
    } catch (err) {

        console.log("[GET_WALLET_DEPOSITS]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}