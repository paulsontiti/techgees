import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    
    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
        const userProgress = await db.userProgress.findFirst({
            where: {
      
              userId,
              chapterId,
            },select:{
                isCompleted:true
            }

          });
        return NextResponse.json(!!userProgress);
    } catch (err) {
        console.log("[IS_CHAPTER_COMPLETED]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


