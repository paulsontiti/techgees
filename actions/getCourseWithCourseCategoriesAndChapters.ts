import { db } from "@/lib/db";

export interface ReturnValue {
  data: any | null;
  error: Error | null;
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
    return { data: course, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
