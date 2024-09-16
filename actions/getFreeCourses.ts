import { db } from "@/lib/db";
import { Chapter, Course, CourseBenefit, Session, WhatToLearn } from "@prisma/client";

interface ReturnValue {
  freeCourses: CourseType[];
  error: Error | null;
}

type CourseType = Course & {
  whatToLearn:WhatToLearn[],
  courseBenefits:CourseBenefit[],
  chapters: (Chapter & {
    sessions: Session[];
   
  })[];
};

export const getFreeCourses = async (): Promise<ReturnValue> => {
  try {
    const freeCourses = await db.course.findMany({
    
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
    return { freeCourses, error: null };
  } catch (error: any) {
    return { freeCourses: [], error };
  }
};
