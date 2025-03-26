import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params: { challengeId },
  }: { params: { challengeId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });

 await db.challengeParticipants.create({
      data:{
        userId,
        challengeId
      }
    });



  

    return NextResponse.json("");
  } catch (err) {
    console.log("[JOIN_CHALLENGE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
    req: Request,
    {
      params: { challengeId },
    }: { params: { challengeId: string } }
  ) {
    try {
      const userId = await getUserCookie();
      if (!userId) return new NextResponse("Unauthoried", { status: 401 });
  
   const participant = await db.challengeParticipants.findUnique({
        where:{
          userId_challengeId:{
            userId,challengeId
          },
          
        }
      });

      return NextResponse.json(participant);
    } catch (err) {
      console.log("[CHALLENGE_PARTICIPANT]", err);
      return new NextResponse("Internal error", { status: 500 });
    }
  }