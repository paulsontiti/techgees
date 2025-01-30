import { NextResponse } from "next/server"
import { getChapterDisLikesCount } from "../../../../../../actions/getChapterDisLikesCount";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
        const { numberOfDisLikes, error } = await getChapterDisLikesCount(
            chapterId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfDisLikes);
    } catch (err) {
        console.log("[CHAPTER_DISLIKES_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


