import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isCourseOwner } from "../../../../../../../../../actions/isCourseOwner";

export async function PUT(
  req: Request,
  {
    params: { courseId},
  }: { params: { courseId: string;} }
) {
  try {
    const { userId } = await getUserCookie();
    if (!userId) return new NextResponse("Unauthorised", { status: 401 });

    //check for course ownership
    
    // const {isCourseCreator,error} = await isCourseOwner(courseId)
    // if (error) return new NextResponse("An error occured", { status: 505 });
    // if (!isCourseCreator) return new NextResponse("Unauthorised", { status: 401 });

    const { reorderSessions } = await req.json();

    for (let item of reorderSessions) {
      await db.session.update({
        where: { id: item.sessionId },
        data: { position: item.position },
      });
    }
    return NextResponse.json("");
  } catch (err) {

    console.log("[SESSION_REORDER]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
