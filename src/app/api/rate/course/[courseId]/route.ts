import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request,{
params:{courseId}
}:{
  params:{courseId:string}
}) {
  try {
    const userId = await getUserCookie();
    const { value } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    console.log(courseId)
 
      await db.rating.create({
        data: {
          userId,
          courseId,
          value
        },
      });

    return NextResponse.json("");
  } catch (err) {
    console.log("[COURSE_RATING]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
