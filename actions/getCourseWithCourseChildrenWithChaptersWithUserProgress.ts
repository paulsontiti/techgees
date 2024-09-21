import { db } from "@/lib/db";
import { Chapter, Course, Session, UserProgress } from "@prisma/client";

export interface ReturnValue {
  courseChildrenWithChaptersAndSessions: CourseType[];
  error: Error | null;
}

type CourseType = Course &
{chapters:(Chapter & {
  userProgresses:UserProgress[],
  sessions:Session[]
})[]}


export const getCourseWithCourseChildrenWithChaptersWithUserProgress = async (
  courseId: string,userId?:string
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
                userProgresses: {
                  where: {
                    userId,
                  },
                },
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
