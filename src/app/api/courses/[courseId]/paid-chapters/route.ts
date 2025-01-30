import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { getPaidChapterPositions } from "../../../../../../actions/getPaidChapterPositions";
import { getPurchasePercentage } from "../../../../../../actions/getPurchasePercentage";
import { getPaidChapters } from "../../../../../../actions/getPaidChapters";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
        const {purchasePercentage} = await getPurchasePercentage(courseId,userId);
       
        const { paidChapters} = await getPaidChapters(courseId, purchasePercentage);


        return NextResponse.json(paidChapters);
    } catch (err) {
        console.log("[GET_PAID_CHAPTERS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


