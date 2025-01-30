import { NextResponse } from "next/server"
import { getChapterRating } from "../../../../../../actions/getChapterRating";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
       const { averageRating, error } = await getChapterRating(
  chapterId
);

        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(averageRating);
    } catch (err) {
        console.log("[CHAPTER_AVERAGE_RATING]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


