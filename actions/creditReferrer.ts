import { db } from "@/lib/db";


/**
 * Credits a referrer earnings and wallet
 * @param {number} amountToCredit - the amount to credit
 * @param {number} commission - the commission earned by the referrer
 * @param {string} paystackId - the id of the paystack payment
 * @param {string} referrerId - the id of the referrer to credit
 */
export const creditReferrer = async (referrerId: string, amountToCredit: number,
    commission: number, paystackId: string) => {
    try {

        const year = new Date().getFullYear();
        const month = new Date().getMonth();
       
        //credit the referrer 

        await db.earning.create({
            data: {
                userId: referrerId,
                amount: amountToCredit,
                year, month, commission,
                paystackPaymentId: paystackId
            }
        })
        //update referrer's wallet
        const wallet = await db.wallet.findUnique({
            where: {
                userId: referrerId
            }, select: {
                balance: true,id:true
            }
        })
        await db.wallet.update({
            where: {
                userId: referrerId
            },
            data: {
                balance: (wallet?.balance ?? 0) + amountToCredit
            }
        })
        await db.walletDeposit.create({
            data:{
                amount:amountToCredit,
                walletId:wallet?.id!,
                year,month,
                description:"Commision from referral"
            }
        })
    } catch (error: any) {
        console.log("[CREDIT_USER_EARNING_AND_WALLET]", error)
    }
}