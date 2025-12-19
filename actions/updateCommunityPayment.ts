import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue {
  success: boolean;
  error: Error | null;
}

export const updateCommunityPayment = async (): Promise<ReturnValue> => {
  try {
    const userId = (await getUserCookie()) || "";

    const purchase = await db.purchase.findFirst({
      where: {
        userId,
        type: "Community",
      },
      select: {
        courseId: true,
        price:true
      },
    });

    //get paystack payments
    const paystack = await db.paystackPayment.findMany({
      where: {
        userId,
        courseId: purchase?.courseId,
        payment_status: "success",
      },
      select: {
        amount: true,
        id: true,
      },
    });

    const totalAmountPaid = paystack
      .map((payment) => payment.amount)
      .reduce((acc, amount) => acc + amount);


      const paystackId = paystack[0].id
    //give student 20% access to the community course
    // if (totalAmountPaid >= 5000) {
    //   await db.paystackPayment.update({
    //     where: {
    //       id: paystack[0].id,
    //     },
    //     data: {
    //       amount: totalAmountPaid + 5000,
    //     },
    //   });

    //   //delete all payments for the course accept the first one so that we are working with one payment 
    //   // since the first payment has been updated with the total amount paid
    //   paystack.slice(1).map(async (payment) => {
    //     await db.paystackPayment.delete({
    //       where: {
    //         id: payment.id,
    //       },
    //     });
    //   });
    // }

    const student = await db.dBUser.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    //get referrees
    const referees = await db.dBUser.findMany({
      where: {
        refererId: student?.id,
      },
      select: {
        userId: true,
      },
    });

    //check if the total amount paid by each referee is upto 5000 naira
    const refereePayments = referees.map(async (referee) => {
      const refereePayments = await db.paystackPayment.findMany({
        where: {
          userId: referee.userId,
          payment_status: "success",
        },
        select: {
          amount: true,
        },
      });
      const amounts = refereePayments.map((payment) => payment.amount);
      if (amounts.reduce((acc, amount) => acc + amount) >= 5000) return true;

      return false;
    });

    //
    const twoRefereesWith5kPayments = (
      await Promise.allSettled(refereePayments)
    )
      .filter((promise) => promise.status === "fulfilled")
      .map((promise) => promise.value)
      .filter((p) => p === true);

      //check if at least two referees have paid 5000 naira and update the student payment to the full course fee
    if (twoRefereesWith5kPayments.length >= 2) {
      await db.paystackPayment.update({
        where: {
          id: paystackId,
        },
        data: {
          amount: purchase?.price!,
        },
      });
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.log("[UPDATE__COMMUNITY_PAYMENT]", error);
    return { success: false, error };
  }
};
