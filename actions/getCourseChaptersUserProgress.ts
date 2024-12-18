import { db } from "@/lib/db";
import { Chapter, Course, Session, UserProgress } from "@prisma/client";
import { getCourseWithCourseChildrenWithChaptersWithUserProgress } from "./getCourseWithCourseChildrenWithChaptersWithUserProgress";
import { SidebarChapter } from "@/app/(course)/courses/combo/[courseId]/child/_components/course-sidebar";
import { getPreviousChapter } from "./getPreviousChapter";
import { getUserChapterProgress } from "./getUserChapterProgress";


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

    const sidebarCourse:any = course;
    //if course is combo get the chapters from its children courses
    if (sidebarCourse?.chapters.length === 0) {
      const { courseChildrenWithChaptersAndSessions, error } = await getCourseWithCourseChildrenWithChaptersWithUserProgress(courseId, userId)
      if (error) throw new Error(error.message)

        //reset the chapters position to suit the combo course chapters position
      if (courseChildrenWithChaptersAndSessions.length > 0) {
        let position = 0;
        for (let childCourse of courseChildrenWithChaptersAndSessions) {
          for (let chapter of childCourse.chapters) {
            chapter.position = position
            //get previous chapter and user previous chapter progress
            const { previousChapter, error: previousError } = await getPreviousChapter(chapter.id, sidebarCourse.id)
          if (previousError)
            return { course:null, error:previousError }

          //get previous chapter user progress
          const { userChapterProgress: previousUserChapterProgress, error: progressError } =
            await getUserChapterProgress(userId, previousChapter?.id ?? "")
          if (progressError)
            return { course:null, error: progressError}
          const sideBarChapter:SidebarChapter = {...chapter,previousChapter,previousUserChapterProgress}
          sidebarCourse.chapters.push(sideBarChapter)
            position++
          }
        }
      }
    }

    return { course:sidebarCourse, error: null }
  } catch (error: any) {
    console.log("[getCourseChaptersUserProgress]", error)
    return { course: null, error }
  }
}