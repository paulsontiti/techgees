import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { getPaidChapterPositions } from "../../../../../../actions/getPaidChapterPositions";
import { getPurchasePercentage } from "../../../../../../actions/getPurchasePercentage";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
        const {purchasePercentage,error} = await getPurchasePercentage(courseId,userId);
        if (error) return new NextResponse("Internal error", { status: 500 });

        const { paidPositions, error:posError } = await getPaidChapterPositions(
            courseId,purchasePercentage
        );
        if (posError) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(paidPositions);
    } catch (err) {
        console.log("[COURSE_PAID_POSITIONS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


