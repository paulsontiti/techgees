import { db } from "@/lib/db"
import { verifyPassword } from "@/lib/verify-password";
import { NextResponse } from "next/server"
import DeviceDetector from "node-device-detector";

export async function POST(req: Request) {

    try {

        
        const { email, password } = await req.json();

        //check if user exists
        const user = await db.dBUser.findFirst({
            where: {
                email
            }
        })
    
        if (!user) {
            return NextResponse.json({ successful: false, user: null, message: "Incorrect login details" })
        }

     if(user?.password){
        if (!verifyPassword(password, user?.password ?? "",user?.salt ?? "")) {
            return NextResponse.json({ successful: false, user: null, message: "Incorrect login details" })
        }
        return NextResponse.json({ successful: true, user, message: "Login was successful" })
     }else{
        return NextResponse.json({ successful: false, user: null, message: "Incorrect login details" })
     }

        
    } catch (err) {

        console.log("[SIGN-IN]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}