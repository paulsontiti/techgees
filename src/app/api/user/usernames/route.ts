
import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { getUsersForReferal } from "../../../../../actions/getUsers";

    export async function GET(req:Request,
       ) {

           
        try {
           const userId = await getUserCookie();
            if (!userId) return new NextResponse("Unaunthorised", {
                status: 401
            })
           const {referers} = await getUsersForReferal();
           
            return NextResponse.json(referers);
            
        } catch (err) {

            console.log("[GET_USERNAMES]", err)
            return new NextResponse("Internal Error", {
                status: 500
            })
        }
    }