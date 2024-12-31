import { db } from "@/lib/db";
import { Chapter, Course } from "@prisma/client";

type ReturnValue = {
  course: CourseChaptersUserProgressType | null;
  error: Error | null;
};

export type CourseChaptersUserProgressType = Course & {
  chapters: Chapter[];
};

export const getCourseWithChapters = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        //isPublished:true
      },
      include: {
        chapters: {
          //where: { isPublished: true },
          orderBy: {
            position: "asc",
          },
        },
      },
    });
  
    return { course, error: null };
  } catch (error: any) {
    console.log("[getCourseWithChapters]", error);
    return { course: null, error };
  }
};
