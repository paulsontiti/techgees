import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function GET(
    req: Request
) {

    try {

        const userId = await getUserCookie();
        if (!userId) return new NextResponse("Unauthorised", { status: 401 });


        const wallet = await db.wallet.findUnique({
            where:{
                userId
            },select:{
                id:true
            }
        })
        const withdrawals = await db.walletWithdrawal.aggregate({
            _sum:{
                amount:true
            },
            where: {
                walletId:wallet?.id
            },
        })

      
        return NextResponse.json(withdrawals._sum.amount);

    } catch (err) {
        console.log("[GET_WALLET_WITHDRAWAL]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}