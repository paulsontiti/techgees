
import { NextResponse } from "next/server"
import { isAStudent } from "../../../../../actions/isAStudent";

    export async function GET(req:Request,
       ) {

           
        try {
          const {isStudent} = await isAStudent();
            return NextResponse.json(isStudent);
            
        } catch (err) {

            console.log("[IS_A_STUDENT]", err)
            return new NextResponse("Internal Error", {
                status: 500
            })
        }
    }