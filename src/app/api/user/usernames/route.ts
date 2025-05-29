
import { NextResponse } from "next/server"
import { getUsersForReferal } from "../../../../../actions/getUsers";

    export async function GET(req:Request,
       ) {

           
        try {
          
           const {referers} = await getUsersForReferal();
           
            return NextResponse.json(referers);
            
        } catch (err) {

            console.log("[GET_USERNAMES]", err)
            return new NextResponse("Internal Error", {
                status: 500
            })
        }
    }