
import { getCourseChapters } from "./getCourseChapters";
import { getCourseWithCourseChildren } from "./getCourseWithCourseChildrenWithChapters";

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



    const { courseChildren, error } =
      await getCourseWithCourseChildren(courseId)
    if (error) throw new Error(error.message)

    let numberOfChapters = 0;
    const paidChapters: { courseId: string, numberOfChapter: number }[] = []

    if (courseChildren.length > 0) {
      for (let childCourse of courseChildren) {
        const {chapters,error} = await getCourseChapters(childCourse.id);
        if(error)    return { paidChapters: [], error };
        for (let _ of chapters) {

          numberOfChapters++
        }
      }
    }



    let numberOfPaidChapters = Math.floor((purchasePercentage / 100) * numberOfChapters);


    for (let course of courseChildren) {
      const {chapters,error} = await getCourseChapters(course.id);
      if(error)    return { paidChapters: [], error };
      if (numberOfPaidChapters > 0) {
        if (numberOfPaidChapters >= chapters.length) {
          paidChapters.push({ courseId: course.id, numberOfChapter: chapters.length })
          numberOfPaidChapters = numberOfPaidChapters - chapters.length
        } else if (numberOfPaidChapters < chapters.length) {
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
