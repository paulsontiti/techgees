import { db } from "@/lib/db";
import { Chapter, Course, Purchase, UserProgress } from "@prisma/client";

interface ReturnValue {
  course: { price: number | null } | null;
  chapter: Chapter | null;
  nextChapter: Chapter | null;
  userProgress: UserProgress | null;
  purchase: Purchase | null;

  error: Error | null;
}
export const getChapterCoursePurchaseUserProgressNextChapter = async ({
  userId,
  courseId,
  chapterId,
}: {
  userId: string;
  chapterId: string;
  courseId: string;
}): Promise<ReturnValue> => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) throw new Error("Chapter or course not found");

    let nextChapter: Chapter | null = null;

    if (chapter.isFree || purchase) {
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      nextChapter,
      userProgress,
      purchase,
      course,
      error: null,
    };
  } catch (error: any) {
    console.log("[getChapter]", error);
    return {
      chapter: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
      course: null,
      error,
    };
  }
};
