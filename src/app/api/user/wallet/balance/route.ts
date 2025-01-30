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
            where: {
                userId
            }, select: {
                balance: true
            }
        })

        if(!wallet){
            await db.wallet.create({
                data:{
                    userId,
                    balance:0,
                }
            })
        }
        return NextResponse.json(wallet?.balance ?? 0);

    } catch (err) {
        console.log("[GET_WALLET_BALANCE]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}