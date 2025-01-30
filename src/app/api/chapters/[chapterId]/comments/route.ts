import { NextResponse } from "next/server"
import { getChapterComments } from "../../../../../../actions/getChapterComments";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
        const { comments, error } = await getChapterComments(
            chapterId
        );
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(comments);
    } catch (err) {
        console.log("[CHAPTER_COMMENTS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


