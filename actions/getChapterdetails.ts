import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import {
  Assignment,
  Chapter,
  ChapterProject,
  ChapterProjectSession,
  Question,
  Session,
  UserProgress,
} from "@prisma/client";

export type ChapterDetailsType = {
  chapter:
    | (Chapter & {
        sessions: Session[];
        questions: Question[];
        assignments: Assignment[];
        chapterProjects: (ChapterProject & {
          chapterProjectSessions: ChapterProjectSession[];
        })[];
      })
    | null;
  userProgress: UserProgress | null;
};

interface ReturnValue {
  chapterDetails: ChapterDetailsType | null;
  error: Error | null;
}

export const getChapterDetails = async (
  chapterId: string
): Promise<ReturnValue> => {
  try {

    const userId = await getUserCookie();

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
      include: {
        sessions: true,
        questions: true,
        assignments: true,
        chapterProjects: {
          include: {
            chapterProjectSessions: true,
          },
        },
      },
    });

    const userProgress = await db.userProgress.findFirst({
      where: {
        userId,
        chapterId,
      },
    });

    return { chapterDetails: { chapter, userProgress }, error: null };
  } catch (error: any) {
    console.log("[CHAPTER_DETAILS]", error);
    return { chapterDetails: null, error };
  }
};
