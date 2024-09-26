import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function PATCH(req: Request,
    {
        params: { assignmentAnswerId }
    }: {
        params: { assignmentAnswerId: string }
    }
) {
    
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 });
        }

     
            await db.assignmentAnswer.update({
                where: {
                   id:assignmentAnswerId
                    
                }, data: {
                    passed:true
                }
            })
        

        return NextResponse.json("");
    } catch (err) {
        console.log("[ASSIGNMENT_PASS]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}