import { db } from "@/lib/db";
import { verifyPayStackPayment } from "./verifyPayment";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue {
  totalAmountPaid: number;
  error: Error | null;
}

export const getTotalAmountPaidForCourse = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const userId = (await getUserCookie()) || "";

    const payments = await db.paystackPayment.findMany({
      where: {
        userId,
        courseId,
        //payment_status: "success",
      },
      select: {
        reference: true,
        amount: true,
        payment_status:true
      },
    });

    let paymentAmounts: number[] = []; //payments.map((p) => p.amount);

    for (let payment of payments) {
      if(payment.payment_status != "success"){
        const { verifiedPayment, error } = await verifyPayStackPayment(payment.reference)

        if (!error) {
            if (verifiedPayment.data.status === "success") {

                paymentAmounts.push(payment.amount)

                await db.paystackPayment.update({
                    where: {
                        reference: payment.reference
                    },
                    data: {
                        payment_status: verifiedPayment.data.status
                    }
                })
            }
        }
      }else{
        paymentAmounts.push(payment.amount)
      }
        

    }

    //get wallet purchases for this course
    const walletpayments = await db.walletPayment.findMany({
      where: {
        userId,
        courseId,
      },
      select: {
        amount: true,
      },
    });

    //add wallet payments to paymentsAmount
    for (let payment of walletpayments) {
      paymentAmounts.push(payment.amount);
    }

    const totalAmountPaid =
      paymentAmounts.length === 0
        ? 0
        : paymentAmounts.reduce((total, curr) => total + curr);

    return { totalAmountPaid, error: null };
  } catch (error: any) {
    console.log("TOTAL_AMOUNT_PAID", error);
    return { totalAmountPaid: 0, error };
  }
};
