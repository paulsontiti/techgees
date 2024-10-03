import { db } from "@/lib/db";
import { Assignment, Chapter, Course, Question, Session, UserProgress } from "@prisma/client";

interface ReturnValue {
  course: Course | null;
  chapter: Chapter & { sessions: Session[], questions: Question[], assignments: Assignment[] } | null;

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
        //isPublished: true,
      }
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        //isPublished: true,
      }, include: {
        sessions: true,
        questions: true,
        assignments: true
      }
    });

    if (!chapter || !course) throw new Error("Chapter or course not found or not published");

    // const nextChapter = await db.chapter.findFirst({
    //   where: {
    //     courseId,
    //     isPublished: true,
    //     position: {
    //       gt: chapter?.position,
    //     },
    //   },
    //   orderBy: {
    //     position: "asc",
    //   },
    // });



    const userProgress = await db.userProgress.findFirst({
      where: {

        userId,
        chapterId,
      },
    });

    return {
      chapter,
      userProgress,
      course,
      error: null,
    };
  } catch (error: any) {
    console.log("[getChapter]", error);
    return {
      chapter: null,

      userProgress: null,
      course: null,
      error
    };
  }
};
