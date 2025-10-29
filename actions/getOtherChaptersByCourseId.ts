import { OtherChapter } from "@/app/(auth)/teacher/courses/[courseId]/_components/chapters-list";
import { db } from "@/lib/db";

interface ReturnValue {
  chapters: OtherChapter[];
  error: Error | null;
}
/**
 * Gets other chapters of a course.
 * @param {string} courseId the course id
 
 * @return {ReturnValue} boolean or error.
 */
export const getOtherChaptersByCourseId = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        otherChapters: true,
      },
    });

    let otherChapters = course
      ? course.otherChapters.map((chapter) =>
          JSON.parse(JSON.stringify(chapter))
        )
      : [];

    otherChapters =
      otherChapters &&
      otherChapters.map((otherChapter) => fetchChapter(otherChapter));

    const chapters = (await Promise.allSettled(otherChapters)).filter(
      (promise) => promise.status === "fulfilled"
    ).map(promise => promise.value);

    return { chapters, error: null };
  } catch (error: any) {
    console.log("[OTHER_CHAPTERS_BY_COURSEID]", error);
    return { chapters: [], error };
  }
};

async function fetchChapter(otherChapter: {
  chapterId: string;
  chapterPosition: number;
}) {
  let chapter = await db.chapter.findUnique({
    where: {
      id: otherChapter.chapterId,
    },
  });

  if (chapter) {
    chapter.position = otherChapter.chapterPosition;
  }

  return { ...chapter, otherChapter: true };
}
