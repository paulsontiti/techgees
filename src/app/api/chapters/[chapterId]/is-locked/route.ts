import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { getPurchasePercentage } from "../../../../../../actions/getPurchasePercentage";
import { getPaidChapterPositions } from "../../../../../../actions/getPaidChapterPositions";


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
            isFree:true,courseId:true,position:true
        }
       })
       const {purchasePercentage} = await getPurchasePercentage(chapter?.courseId || "",userId);
       const {paidPositions} = await getPaidChapterPositions(chapter?.courseId || "",purchasePercentage);
       const chapterPaidFor = paidPositions?.indexOf(chapter?.position || 0);

       const isLocked = !chapter?.isFree && chapterPaidFor < 0;
        return NextResponse.json(isLocked);
    } catch (err) {
        console.log("[IS_CHAPTER_LOCKED]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


