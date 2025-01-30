import { db } from "@/lib/db"
import { NextResponse } from "next/server"

    export async function POST(req:Request,
        { params: { userId } }: { params: { userId: string } }) {

           
        try {
           
            if (!userId) return new NextResponse("Unaunthorised", {
                status: 401
            })
            const firstGen = await db.dBUser.findUnique({
                where: {
                    userId
                }, select: {
                    referees: true,
                    
                }
            })
           
            return NextResponse.json(firstGen);
            
        } catch (err) {

            console.log("[GET_NETWORK_COUNT]", err)
            return new NextResponse("Internal Error", {
                status: 500
            })
        }
    }