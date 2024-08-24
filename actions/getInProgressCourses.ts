import { db } from "@/lib/db";
import { getCourseProgress } from "./getCourseProgress";
import { SearchPageCourseType } from "./getCourseWithProgressChapters";

type ReturnValue = {
  courses: SearchPageCourseType[];
  error: Error | null;
};


export const getInProgressCourses = async (
  userId: string
): Promise<ReturnValue> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const freeCourses = await db.userProgress.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      select: {
        session: {
          select: {
            chapter: {
              select: {
                course: {
                  include: {
                    chapters: {
                      where: {
                        isPublished: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    let courses: SearchPageCourseType[] = purchasedCourses.map(
      (pC) => {
        return {
            ...pC.course,
            progressPercentage:0
        }
      }
    );

   
        for(let freeCourse of freeCourses){
            if(freeCourse){

                if(!courses.find((course)=> course?.id === freeCourse.session?.chapter.course.id)){
                    courses.push({...freeCourse.session?.chapter.course!,progressPercentage:0})
                }
            }
        }
    for(let course of courses){
        const progress = await getCourseProgress(userId,course?.id ?? "")
        if(course !== null){
            course["progressPercentage"] = progress.progressPercentage
        }
       
    }
    return { courses, error: null };
  } catch (error: any) {
    console.log("[getInProgressCourses]", error);
    return { courses: [], error };
  }
};
