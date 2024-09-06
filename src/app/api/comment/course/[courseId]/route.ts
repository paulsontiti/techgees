import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request,
    {
        params:{courseId}
    }:{
        params:{courseId:string}
    }
) {
  try {
    const { userId } = auth();
    const { comment } = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }
  
      await db.comment.create({
        data: {
          userId,
          courseId,
          comment
        },
      });
    

    return NextResponse.json("");
  } catch (err) {
    console.log("[COURSE_COMMENT]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
