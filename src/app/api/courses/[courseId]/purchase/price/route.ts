import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { db } from "@/lib/db";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
     const purchase = await db.purchase.findUnique({
        where:{
            courseId_userId:{
                userId,courseId
            }
        },select:{
            price:true
        }
     })

        return NextResponse.json(purchase?.price ?? 0);
    } catch (err) {
        console.log("[COURSE_PURCHASE_PRICE]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


