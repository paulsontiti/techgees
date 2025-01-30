import { NextResponse } from "next/server"
import { getChapterNumberOfRatings } from "../../../../../../actions/getChapterNumberOfRatings";


export async function GET(
    req: Request,
    { params: { chapterId } }: { params: { chapterId: string } }
) {

    try {
       const { numberOfRatings, error } = await getChapterNumberOfRatings(
  chapterId
);
        if (error) return new NextResponse("Internal error", { status: 500 });

        return NextResponse.json(numberOfRatings);
    } catch (err) {
        console.log("[CHAPTER_RATING_COUNT]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


