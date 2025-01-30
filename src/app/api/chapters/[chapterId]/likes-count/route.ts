import { NextResponse } from "next/server"
import { getChapterLikesCount } from "../../../../../../actions/getChapterLikesCount";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
        const { numberOfLikes, error } = await getChapterLikesCount(
            chapterId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfLikes);
    } catch (err) {
        console.log("[CHAPTER_LIKES_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


