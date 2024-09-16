import { db } from "@/lib/db";
import { Chapter, Course, Session, UserProgress } from "@prisma/client";

interface ReturnValue {
  course:Course | null;
  chapter: Chapter & {sessions:Session[]} | null;
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
      }
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },include:{
        sessions:true
      }
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
    

    const userProgress = await db.userProgress.findFirst({
      where: {
       
          userId,
          chapterId,
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
