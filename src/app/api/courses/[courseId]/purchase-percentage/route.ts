import { NextResponse } from "next/server"
import { getPurchasePercentage } from "../../../../../../actions/getPurchasePercentage";
import { getUserCookie } from "@/lib/get-user-cookie";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { purchasePercentage, error } = await getPurchasePercentage(
  courseId,userId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(purchasePercentage);
    } catch (err) {
        console.log("[COURSE_PURCHASE_PERCENTAGE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


