import { NextResponse } from "next/server"
import { hasDisLikedChapter } from "../../../../../../actions/hasDisLikedChapter";
import { getUserCookie } from "@/lib/get-user-cookie";
import { hasLikedChapter } from "../../../../../../actions/hasLikedChapter";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { hasLiked, error } = await hasLikedChapter(
  chapterId,userId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasLiked);
    } catch (err) {
        console.log("[HAS_LIKED_CHAPTER]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


