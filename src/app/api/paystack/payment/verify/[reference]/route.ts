
import { NextResponse } from "next/server";
import { verifyPayStackPayment } from "../../../../../../../actions/verifyPayment";
import { updatePayment } from "../../../../../../../actions/updatePayment";

export async function GET(req: Request,
  {
    params: { reference }
  }: {
    params: { reference: string }
  }
) {
  try {
    const { verifiedPayment} = await verifyPayStackPayment(reference);

  let payment = null;
    if (verifiedPayment) {
        payment = {
            amount: verifiedPayment.data.amount / 100,
            status: verifiedPayment.data.status,
        };
        await updatePayment(reference);
    }

    return NextResponse.json(payment);
  } catch (err) {
    console.log("[VERIFY_PAYMENT]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
