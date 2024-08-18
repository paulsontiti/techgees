import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorised", { status: 401 });
    
    const courseOwner = await db.course.findUnique({
        where:{
            id_userId:{
                id:courseId,
                userId
            }
        }
    })
if(!courseOwner) return new NextResponse("Unauthorised", { status: 401 });

const {reorderSessions} = await req.json()

for(let item of reorderSessions){
    await db.session.update({
        where:{id:item.sessionId},
        data:{position: item.position}
    })
}
return NextResponse.json("")

} catch (err) {
    console.log("[SESSION_REORDER]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
