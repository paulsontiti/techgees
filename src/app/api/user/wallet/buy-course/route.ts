import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {

    try {
        const { amount, courseId } = await req.json();
        const userId = await getUserCookie();
        if (!userId) return new NextResponse("Unauthorised", { status: 401 });


        const wallet = await db.wallet.findUnique({
            where: {
                userId
            }, select: {
                id: true, balance: true
            }
        })
        if (wallet?.balance! >= amount) {
            //deduct from wallet
            await db.wallet.update({
                where: {
                    userId
                }, data: {
                    balance: wallet?.balance! - amount
                }
            })
            const course =  await db.course.findUnique({
              where:{
                id:courseId
              },select:{
                price:true,title:true
              }
            })
            //create wallet withdrawal
            await db.walletWithdrawal.create({
                data: {
                    walletId: wallet?.id!,
                    amount,
                    year: new Date().getFullYear(),
                    month: new Date().getMonth(),
                    description:`Paid for ${course?.title}`
                }
            })
            //create purchase for this course
            const purchase = await db.purchase.findUnique({
                where:{
                  courseId_userId:{
                    userId,courseId
                  }
                }
              })
          
              if(!purchase){
               
                await db.purchase.create({
                  data:{
                    price:course?.price ?? 0,
                    courseId,
                    userId
                  }
                })
      
                
              }
            //create wallet payment
            await db.walletPayment.create({
                data: {
                    userId,
                    amount,
                    courseId
                }
            })
            return NextResponse.json("");

        }

        return NextResponse.json("Wallet balance is insufficient");

    } catch (err) {
        console.log("[BUY_COURSE_WITH_WALLET]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}