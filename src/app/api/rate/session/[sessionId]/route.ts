import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request,{
params:{sessionId}
}:{
  params:{sessionId:string}
}) {
  try {
    const userId = await getUserCookie();
    const { value } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
 
      await db.rating.create({
        data: {
          userId,
          sessionId,
          value
        },
      });

    return NextResponse.json("");
  } catch (err) {
    console.log("[SESSION_RATING]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
