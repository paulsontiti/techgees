import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { creditReferrer } from "./creditReferrer";

interface ReturnValue {
  success: boolean;
  error: Error | null;
}

export const creditReferrers = async (
  reference: string,
  verifiedAmount: number
): Promise<ReturnValue> => {
  try {
    //get paystack payment
    const paystack = await db.paystackPayment.findUnique({
      where: {
        reference,
      },
      select: {
        id: true,
      },
    });

    const paystackId = paystack?.id || "";

    const userId = (await getUserCookie()) || "";

    //get referrer
    const referer = await db.dBUser.findUnique({
      where: {
        userId,
      },
      select: {
        referer: true,
      },
    });
    if (referer?.referer) {
      //credit the referrer 5% of the amount
      const earning = verifiedAmount * (5 / 100); //paystack payments are in kobos,

      await creditReferrer(referer?.referer?.userId, earning, 5, paystackId);

      //get user grand referrer

      const grandReferrer = await db.dBUser.findUnique({
        where: {
          userId: referer?.referer?.userId,
        },
        select: {
          referer: true,
        },
      });

      if (grandReferrer?.referer) {
        //credit the grand referrer 2% of the amount
        const earning = verifiedAmount * (2 / 100);
        await creditReferrer(
          grandReferrer.referer.userId,
          earning,
          2,
          paystackId
        );

        //get user great grand referrer

        const greatGrandReferrer = await db.dBUser.findUnique({
          where: {
            userId: grandReferrer?.referer?.userId,
          },
          select: {
            referer: true,
          },
        });

        if (greatGrandReferrer?.referer) {
          //credit the great grand referrer 1.5% of the amount
          const earning = verifiedAmount * (1.5 / 100);
          await creditReferrer(
            greatGrandReferrer.referer.userId,
            earning,
            1.5,
            paystackId
          );

          //get user great great grand referrer

          const greatGreatGrandReferrer = await db.dBUser.findUnique({
            where: {
              userId: greatGrandReferrer?.referer?.userId,
            },
            select: {
              referer: true,
            },
          });

          if (greatGreatGrandReferrer?.referer) {
            //credit the great grand referrer 1% of the amount
            const earning = verifiedAmount * (1 / 100);
            await creditReferrer(
              greatGreatGrandReferrer.referer.userId,
              earning,
              1,
              paystackId
            );

            //get user great great great grand referrer

            const greatGreatGreatGrandReferrer = await db.dBUser.findUnique({
              where: {
                userId: greatGreatGrandReferrer?.referer?.userId,
              },
              select: {
                referer: true,
              },
            });

            if (greatGreatGreatGrandReferrer?.referer) {
              //credit the great grand referrer .5% of the amount
              const earning = verifiedAmount * (0.5 / 100);
              await creditReferrer(
                greatGreatGreatGrandReferrer.referer.userId,
                earning,
                0.5,
                paystackId
              );
            }
          }
        }
      }
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.log("[UPDATE_PAYMENT]", error);
    return { success: false, error };
  }
};
