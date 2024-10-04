import { db } from "@/lib/db";
import { Chapter, Course } from "@prisma/client";
import { getCourseWithCourseChildrenWithChaptersAndSessions } from "./getCourseWithCourseChildrenWithChapters";

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
    // if (course?.chapters.length === 0) {
    //   const { courseChildrenWithChaptersAndSessions, error } = await getCourseWithCourseChildrenWithChaptersAndSessions(courseId)
    //   if (error) throw new Error(error.message)

    //   if (courseChildrenWithChaptersAndSessions.length > 0) {
    //     for (let childCourse of courseChildrenWithChaptersAndSessions) {
    //       for (let chapter of childCourse.chapters) {

    //         course.chapters.push(chapter)
    //       }
    //     }
    //   }
    // }
    return { course, error: null };
  } catch (error: any) {
    console.log("[getCourseWithChapters]", error);
    return { course: null, error };
  }
};
