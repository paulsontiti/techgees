
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";
import { getPreviousChapter } from "../../../../../../../../actions/getPreviousChapter";
import { getUserChapterProgress } from "../../../../../../../../actions/getUserChapterProgress";

export async function GET(
  req: Request,
  {
    params: {courseId, chapterId },
  }: { params: {courseId:string,chapterId: string} }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });

    const { previousChapter, error: previousError } = await getPreviousChapter(chapterId, courseId)
    if (previousError)
        return new NextResponse("Internal error", { status: 500 });
      
    return NextResponse.json(previousChapter);
  } catch (err) {
    console.log("[GET_PREVIOUS_CHAPTER]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}