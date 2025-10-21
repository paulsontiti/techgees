import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params: { sessionId } }: { params: { sessionId: string } }
) {
  try {
    const session = await db.session.findUnique({
      where: {
        id: sessionId,
      },
    });
    return NextResponse.json(session);
  } catch (err) {
    console.log("[GET_SESSION]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      values: { firstName, lastName, phone, whatsApp, referrerId },
      questionsAndAnswers,
    } = await req.json();

    const survey = await db.studentRealityCheckSurvey.findFirst({
      where: {
        OR: [{ phoneNumber: phone }, { whatsAppNumber: whatsApp }],
      },
    });
    if (survey) return NextResponse.json("Phone or WhatsApp already exixts");
    await db.studentRealityCheckSurvey.create({
      data: {
        questionsAndAnswers,
        firstName,
        lastName,
        phoneNumber: phone,
        whatsAppNumber: whatsApp,
        referrerId,
      },
    });
    return NextResponse.json("");
  } catch (err) {
    console.log("[POST_SURVEY]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
