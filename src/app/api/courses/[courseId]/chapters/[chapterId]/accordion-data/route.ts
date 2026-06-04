import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";
import { getPreviousChapter } from "../../../../../../../../actions/getPreviousChapter";
import { getChapterProgress } from "../../../../../../../../actions/getChapterProgress";
import { getUserChapterProgress } from "../../../../../../../../actions/getUserChapterProgress";
import { getChaptersSessions } from "../../../../../../../../actions/getChapterSessions";

export async function GET(
  req: Request,
  {
    params: { courseId, chapterId },
  }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });

    const { previousChapter } = await getPreviousChapter(chapterId, courseId);
    

    //get previous chapter user progress
    const { userChapterProgress: previousUserChapterProgress } =
      await getUserChapterProgress(userId, previousChapter?.id || "");

    const { progressPercentage: chapterProgress } =
      await getChapterProgress(userId, chapterId);

      const {sessions} = await getChaptersSessions(chapterId);

    return NextResponse.json({
      previousChapter,
      previousUserChapterProgress,
      chapterProgress,sessions
    });
  } catch (err) {
    console.log("[GET_CHAPTER_ACCORDION_DATA]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
