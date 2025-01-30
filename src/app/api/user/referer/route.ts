
import { NextResponse } from "next/server"
import { getReferer } from "../../../../../actions/getReferer";
import { getUserCookie } from "@/lib/get-user-cookie";

    export async function GET(req:Request,
       ) {

           
        try {
           const userId = await getUserCookie();
            if (!userId) return new NextResponse("Unaunthorised", {
                status: 401
            })
           const {referer} = await getReferer(userId);
           
            return NextResponse.json(referer);
            
        } catch (err) {

            console.log("[GET_USER_REFERER]", err)
            return new NextResponse("Internal Error", {
                status: 500
            })
        }
    }