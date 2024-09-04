import { db } from "@/lib/db";
import { Chapter, UserProgress } from "@prisma/client";
import { getTotalAmountPaidForCourse } from "./getTotalAmountPaidForCourse";

interface ReturnValue {
  course: { price: number | null } | null;
  chapter: Chapter | null;
  nextChapter: Chapter | null;
  userProgress: UserProgress | null;

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

    if (!chapter || !course) throw new Error("Chapter or course not found or not published");

    const nextChapter = await db.chapter.findFirst({
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
      course,
      error: null,
    };
  } catch (error: any) {
    console.log("[getChapter]", error);
    return {
      chapter: null,
      nextChapter: null,
      userProgress: null,
      course: null,
      error,
    };
  }
};
