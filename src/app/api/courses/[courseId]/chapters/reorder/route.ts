import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthorised", { status: 401 });
    
    const courseOwner = await db.course.findUnique({
        where:{
                id:courseId,
                userId
            
        }
    })
if(!courseOwner) return new NextResponse("Unauthorised", { status: 401 });

const {reorderedChapters} = await req.json()
console.log(reorderedChapters)

for(let item of reorderedChapters){
    await db.chapter.update({
        where:{id:item.chapterId},
        data:{position: item.position}
    })
}
return NextResponse.json("")

} catch (err) {
    console.log("[CHAPTER_REORDER]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
