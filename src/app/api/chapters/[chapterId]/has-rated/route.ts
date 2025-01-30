import { NextResponse } from "next/server"
import { getUserCookie } from "@/lib/get-user-cookie";
import { hasRatedChapter } from "../../../../../../actions/hasRatedChapter";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { hasRated, error } = await hasRatedChapter(
  chapterId,userId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasRated);
    } catch (err) {
        console.log("[HAS_RATED_CHAPTER]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


