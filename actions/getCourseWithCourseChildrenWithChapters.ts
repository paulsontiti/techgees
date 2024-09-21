import { db } from "@/lib/db";
import { Chapter, Course, Session } from "@prisma/client";

export interface ReturnValue {
  courseChildrenWithChaptersAndSessions: CourseType[];
  error: Error | null;
}

type CourseType = Course &
{chapters:(Chapter & {
  sessions:Session[]
})[]}


export const getCourseWithCourseChildrenWithChaptersAndSessions = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const courseWithChildren = await db.courseChild.findMany({
      where: {
        parentCourseId: courseId,
      },

      include: {
        childCourse: {
          
          include:{
            
            chapters:{
              include:{
                sessions:true
              }
            }
          }
        }
      },orderBy: {
        position: "asc",
      },
    });
   const courseChildrenWithChaptersAndSessions = courseWithChildren.map((c)=> c.childCourse)
    return { courseChildrenWithChaptersAndSessions, error: null };
  } catch (error: any) {
    return { courseChildrenWithChaptersAndSessions: [], error };
  }
};
