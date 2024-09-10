import { db } from "@/lib/db";
import { Chapter, Course, CourseBenefit, Session, WhatToLearn } from "@prisma/client";

interface ReturnValue {
  course: CourseType | null;
  error: Error | null;
}

type CourseType = Course & {
  whatToLearn:WhatToLearn[],
  courseBenefits:CourseBenefit[],
  chapters: (Chapter & {
    sessions: Session[];
   
  })[];
};

export const getCourse = async (courseId: string): Promise<ReturnValue> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        whatToLearn:true,
        courseBenefits:true,
        chapters: {
          include: {
            
            sessions: {
              orderBy: {
                position: "asc",
              },
            },
            
          },
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
