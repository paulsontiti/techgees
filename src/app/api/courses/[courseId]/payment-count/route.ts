import { NextResponse } from "next/server"
import { getCountOfPaymentByCourseId } from "../../../../../../actions/getCountOfPaymentByCourseId"


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
const { numberOfPayments,error } = await getCountOfPaymentByCourseId(
  courseId
);
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfPayments);
    } catch (err) {
        console.log("[COURSE_PAYMENT_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


