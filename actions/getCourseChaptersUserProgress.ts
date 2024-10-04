import { db } from "@/lib/db";
import { Chapter, Course, Session, UserProgress } from "@prisma/client";
import { getCourseWithCourseChildrenWithChaptersWithUserProgress } from "./getCourseWithCourseChildrenWithChaptersWithUserProgress";


type ReturnValue = {
  course: CourseChaptersUserProgressType | null,
  error: Error | null
}

export type CourseChaptersUserProgressType = Course & {
  chapters: (Chapter & {
    sessions: Session[] | null
    userProgresses: UserProgress[] | null
  })[]
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

    // if (course?.chapters.length === 0) {
    //   const { courseChildrenWithChaptersAndSessions, error } = await getCourseWithCourseChildrenWithChaptersWithUserProgress(courseId, userId)
    //   if (error) throw new Error(error.message)

    //   if (courseChildrenWithChaptersAndSessions.length > 0) {
    //     let position = 0;
    //     for (let childCourse of courseChildrenWithChaptersAndSessions) {
    //       for (let chapter of childCourse.chapters) {
    //         chapter.position = position
    //         course.chapters.push(chapter)
    //         position++
    //       }
    //     }
    //   }
    // }

    return { course, error: null }
  } catch (error: any) {
    console.log("[getCourseChaptersUserProgress]", error)
    return { course: null, error }
  }
}