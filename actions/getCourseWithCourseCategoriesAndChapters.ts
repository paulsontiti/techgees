import { db } from "@/lib/db";
import { Chapter, Course, CourseCategory } from "@prisma/client";

export interface ReturnValue {
  course: CourseType | null;
  error: Error | null;
}

type CourseType = Course & {
    courseCategories: CourseCategory[],
    chapters: Chapter[]
  }


export const getCourseWithCourseCategoriesAndChapters = async (
  userId: string,
  courseId: string
): Promise<ReturnValue> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },

      include: {
        courseCategories: true,
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    return { course, error: null };
  } catch (error: any) {
    return { course: null, error };
  }
};
