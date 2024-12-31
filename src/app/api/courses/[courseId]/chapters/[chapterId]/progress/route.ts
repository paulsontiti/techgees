
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";
import { getChapterProgress } from "../../../../../../../../actions/getChapterProgress";

export async function GET(
  req: Request,
  {
    params: { chapterId },
  }: { params: {chapterId: string} }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });

    const { progressPercentage:chapterProgressPercentage, error } = await getChapterProgress(
        userId,
        chapterId
      );

      if (error)
        return new NextResponse("Internal error", { status: 500 });
    return NextResponse.json(chapterProgressPercentage);
  } catch (err) {
    console.log("[GET_CHAPTER_PROGRESS]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}