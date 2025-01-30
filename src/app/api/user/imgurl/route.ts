
import { NextResponse } from "next/server"
import { getCurrentUser } from "../../../../../actions/getCurrentUser";

    export async function GET(req:Request,
       ) {

           
        try {
          const {user} = await getCurrentUser();
            return NextResponse.json(user?.imageUrl ?? "");
            
        } catch (err) {

            console.log("[GET_USER_REFERER]", err)
            return new NextResponse("Internal Error", {
                status: 500
            })
        }
    }