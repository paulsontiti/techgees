import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

    try {
        const userId = await getUserCookie();
        const wallet = await db.wallet.findUnique({
            where: {
                userId
            },select:{
                id:true
            }
        })

        const deposits = await db.walletDeposit.findMany({
           
            where: {
                walletId: wallet?.id
            }
        })

        const withdrawals = await db.walletWithdrawal.findMany({
           
            where: {
                walletId: wallet?.id
            }
        })

        //MERGE all deposits and withdrawals
        const inflowOutflow:{
            description:string,
            amount:number,
            type:string,
            createdAt:Date
        }[] = [];
        deposits.map((flow)=>{
            inflowOutflow.push({
                description:flow.description || "",
                amount:flow.amount,
                type:"incoming",
                createdAt:flow.createdAt
            })
        })
        withdrawals.map((flow)=>{
            inflowOutflow.push({
                description:flow.description || "",
                amount:flow.amount,
                type:"outgoing",
                createdAt:flow.createdAt
            })
        })
        return NextResponse.json(inflowOutflow.sort((a,b)=> b.createdAt.getTime() - a.createdAt.getTime()))
    } catch (err) {

        console.log("[GET_WALLET_DEPOSITS_WITHDRAWALS]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}