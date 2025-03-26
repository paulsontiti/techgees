import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(
    req: Request,
    { params: { participantId } }: { params: { participantId: string } }
) {

    try {
       const participant = await db.challengeParticipants.findUnique({
        where:{
            id:participantId
        },include:{
            challenge:true
        }
       })

        return NextResponse.json(participant);
    } catch (err) {
        console.log("[GET_CHALLENGE_PARTICIPANT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}
