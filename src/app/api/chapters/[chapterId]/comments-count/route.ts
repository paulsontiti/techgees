import { NextResponse } from "next/server"
import { getChapterCommentsCount } from "../../../../../../actions/getChapterCommentsCount";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
        const { numberOfComments, error } = await getChapterCommentsCount(
            chapterId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfComments);
    } catch (err) {
        console.log("[CHAPTER_COMMENTS_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


