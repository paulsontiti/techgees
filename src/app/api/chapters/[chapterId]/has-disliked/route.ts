import { NextResponse } from "next/server"
import { hasDisLikedChapter } from "../../../../../../actions/hasDisLikedChapter";
import { getUserCookie } from "@/lib/get-user-cookie";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
        const userId = await getUserCookie();
        if(!userId) return new NextResponse("Unauthorised", { status: 401 });
       const { hasDisLiked, error } = await hasDisLikedChapter(
  chapterId,userId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(hasDisLiked);
    } catch (err) {
        console.log("[HAS_DISLIKED_CHAPTER]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


