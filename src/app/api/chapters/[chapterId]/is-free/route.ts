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
       const chapter = await db.chapter.findUnique({
        where:{
            id:chapterId
        },select:{
            isFree:true
        }
       })
      
        return NextResponse.json(chapter?.isFree);
    } catch (err) {
        console.log("[IS_CHAPTER_FREE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


