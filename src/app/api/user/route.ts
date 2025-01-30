import { db } from "@/lib/db"
import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { getCurrentUser } from "../../../../actions/getCurrentUser"



export async function PATCH(
    req: Request
) {

    try {

        const userId = await getUserCookie()
        if (!userId) return new NextResponse("Unauthoried", { status: 401 })

        const values = await req.json();
        await db.dBUser.update({
            where: {
                userId
            },
            data: {
                ...values
            }
        })

       
        return NextResponse.json("")

    } catch (err) {
        console.log("[PROFILE_UPDATE]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}
export async function GET(
    req: Request
) {

    try {

        const { user } = await getCurrentUser();

        return NextResponse.json(user)

    } catch (err) {
        console.log("[GET_CURRENT_USER]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}