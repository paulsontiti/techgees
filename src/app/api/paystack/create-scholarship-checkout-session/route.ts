import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userId = await getUserCookie();
    const { email, amount, scholarshipId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email,
        amount: amount * 100, // Paystack amount is in kobo
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK!}`,
        },
      }
    );

    const { authorization_url, reference } = response.data.data;

    if (reference) {
      await db.paystackPayment.create({
        data: {
          reference,
          userId,
          scholarshipId,
          amount,
        },
      });

      const student = await db.scholarshipStudents.findUnique({
        where: {
          userId_scholarshipId: {
            userId,
            scholarshipId,
          },
        },
      });

      if (!student) {
        await db.scholarshipStudents.create({
          data: {
            userId,
            scholarshipId,
          },
        });
      }
    }

    return NextResponse.json({
      authorizationUrl: authorization_url,
      reference,
    });
  } catch (err) {
    console.log("[PAYSTACK_CHECKOUT_SESSION]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
