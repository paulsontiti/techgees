
import { getCourseWithCourseChildrenWithChaptersAndSessions } from "./getCourseWithCourseChildrenWithChapters";

interface ReturnValue {
  paidChapters: PaidChapterType[];
  error: Error | null;
}

export type PaidChapterType = { courseId: string, numberOfChapter: number }

export const getPaidChapters = async (
  courseId: string,
  purchasePercentage: number
): Promise<ReturnValue> => {
  try {



    const { courseChildrenWithChaptersAndSessions, error } =
      await getCourseWithCourseChildrenWithChaptersAndSessions(courseId)
    if (error) throw new Error(error.message)

    let numberOfChapters = 0;
    const paidChapters: { courseId: string, numberOfChapter: number }[] = []

    if (courseChildrenWithChaptersAndSessions.length > 0) {
      for (let childCourse of courseChildrenWithChaptersAndSessions) {
        for (let _ of childCourse.chapters) {

          numberOfChapters++
        }
      }
    }



    let numberOfPaidChapters = Math.floor((purchasePercentage / 100) * numberOfChapters);


    for (let course of courseChildrenWithChaptersAndSessions) {
      if (numberOfPaidChapters > 0) {
        if (numberOfPaidChapters >= course.chapters.length) {
          paidChapters.push({ courseId: course.id, numberOfChapter: course.chapters.length })
          numberOfPaidChapters = numberOfPaidChapters - course.chapters.length
        } else if (numberOfPaidChapters < course.chapters.length) {
          paidChapters.push({ courseId: course.id, numberOfChapter: numberOfPaidChapters })
          numberOfPaidChapters = 0
        }
      } else {
        paidChapters.push({ courseId: course.id, numberOfChapter: 0 })
      }
    }


    return { paidChapters, error: null };
  } catch (error: any) {
    console.log("[GET_NUMBER_OF_PAID_CHAPTERS]", error);
    return { paidChapters: [], error };
  }
};
