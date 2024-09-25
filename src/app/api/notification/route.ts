import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 })
        }

        const notifications = await db.notification.findMany({
            where: {
                OR: [
                    {
                        receiverId: "all"
                    },
                    {
                        receiverId: userId
                    }
                ]

            }
        })

        return NextResponse.json(notifications)
    } catch (err) {

        console.log("[GET_NOTIFICATIONS]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}

export async function POST(req: Request) {

    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 })
        }

        const {title,message,senderId,receiverId} = await req.json()

         await db.notification.create({
            data: {
               title,senderId,message,receiverId
            }
        })

        return NextResponse.json('')
    } catch (err) {

        console.log("[NOTIFICATION]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}