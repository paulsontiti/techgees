import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params: { challengeId },
  }: { params: { challengeId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });


    const challenge = await db.challenge.findUnique({
      where: {
        id: challengeId,
        userId,

      }
    });



    if (!challenge || !challenge.title || !challenge.description || !challenge.subTitle || !challenge.endDate
        || !challenge.startDate
    ) {
      return new NextResponse("Missing required fields", { status: 404 });
    }

    await db.challenge.update({
      where: {
        id: challengeId
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[CHALLENGE_PUBLISH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}