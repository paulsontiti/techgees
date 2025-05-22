import { db } from "@/lib/db";
import { Course } from "@prisma/client";
import { getCourseWithCourseChildrenWithChaptersWithUserProgress } from "./getCourseWithCourseChildrenWithChaptersWithUserProgress";
import { SidebarChapter } from "@/app/(course)/courses/combo/[courseId]/child/_components/course-sidebar";



type ReturnValue = {
  course: CourseChaptersUserProgressType | null,
  error: Error | null
}

export type CourseChaptersUserProgressType = Course & {
  chapters: SidebarChapter[]
}


export const getCourseChaptersUserProgress = async (
  userId: string, courseId: string
): Promise<ReturnValue> => {


  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          //where: { isPublished: true },
          include: {
            userProgresses: {
              where: {
                userId,
              },
            },
            sessions: {
              where: {
                //isPublished:true
              }, orderBy: {
                position: "asc"
              }
            }
          }, orderBy: {
            position: "asc"
          }
        },
      },
    });


    //if course is combo get the chapters from its children courses
    if (course?.chapters.length === 0) {
      const { courseChildrenWithChaptersAndSessions, error } = await getCourseWithCourseChildrenWithChaptersWithUserProgress(courseId, userId)
      if (error) throw new Error(error.message)

      //reset the chapters position to suit the combo course chapters position
      if (courseChildrenWithChaptersAndSessions.length > 0) {
        let position = 0;
        for (let childCourse of courseChildrenWithChaptersAndSessions) {
          for (let chapter of childCourse.chapters) {
            chapter.position = position
            course.chapters.push(chapter)
            position++
          }
        }
      }
    }
 

    return { course, error: null }
  } catch (error: any) {
    console.log("[getCourseChaptersUserProgress]", error)
    return { course: null, error }
  }
}