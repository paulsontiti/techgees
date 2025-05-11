import { NextResponse } from "next/server";
import { verifyPayStackPayment } from "../../../../../../../actions/verifyPayment";
import { creditReferrers} from "../../../../../../../actions/creditReferrers";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  {
    params: { reference },
  }: {
    params: { reference: string };
  }
) {
  try {
    const { verifiedPayment } = await verifyPayStackPayment(reference);

   
    let payment = null;

    if (verifiedPayment) {
      const verifiedAmount = verifiedPayment.data.amount / 100;
      const status = verifiedPayment.data.status;

      payment = {
        amount: verifiedAmount,
        status,
      };

      if (status === "success") {
        await db.paystackPayment.update({
          where: {
            reference,
          },
          data: {
            payment_status: status,
          },
        });

        await creditReferrers(reference, verifiedAmount);
      }
    }

    return NextResponse.json(payment);
  } catch (err) {
    console.log("[VERIFY_PAYMENT]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
