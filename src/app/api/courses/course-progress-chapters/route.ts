import { getUserCookie } from "@/lib/get-user-cookie"
import { NextResponse } from "next/server"
import { getCourseWithProgressChapters } from "../../../../../actions/getCourseWithProgressChapters";

export async function POST(req:Request) {

    try {
        const userId = await getUserCookie();
        if (!userId) return new NextResponse("Unauthorised", {
            status: 401
        })

        const {title,categoryId} = await req.json();

        const { courses } = await getCourseWithProgressChapters({userId,title,categoryId});

        

        return NextResponse.json(courses);
    } catch (err) {

        console.log("[GET_COURSE_PROGRESS_CHAPTER]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}