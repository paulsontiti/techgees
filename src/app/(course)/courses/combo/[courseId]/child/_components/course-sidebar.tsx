import React from "react";
import CourseProgress from "@/components/course-progress";
import { Chapter, Course, Session, UserProgress } from "@prisma/client";

import BackButton from "@/components/back-button";
import { ChapterAccordion } from "./chapter-accordion";
import { getChapterProgress } from "../../../../../../../../actions/getChapterProgress";
import { getPreviousChapter } from "../../../../../../../../actions/getPreviousChapter";
import ErrorPage from "@/components/error";
import { getUserChapterProgress } from "../../../../../../../../actions/getUserChapterProgress";
import { getUserCookie } from "@/lib/get-user-cookie";

type CourseSidebarProps = {
  course: Course;
  parentId: string,
  chapters: SidebarChapter[],
  progressPercentage: number;
  
};

export type SidebarChapter = Chapter & {
  sessions: Session[],
  userProgresses: UserProgress[]

}

 async function CourseSidebar({
  course, chapters,
  progressPercentage, parentId
}: CourseSidebarProps) {

  const userId = await getUserCookie() ?? "";

  return (
    <div className="h-[70vh] mt-4 border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="py-8 px-2 flex flex-col border-b gap-y-2">
        <BackButton label="main course"
          url={`/courses/combo/${parentId}`} />
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">{course.title}</h1>

        </div>

        <div className="mt-10">
          <CourseProgress variant="success" value={progressPercentage} />

        </div>
      </div>
      <div className="flex flex-col w-full">
        {chapters.map(async(chapter) => {
          const { progressPercentage:chapterProgressPercentage, error } = await getChapterProgress(
            userId,
            chapter.id
          );

          if (error)
            return <ErrorPage name={error.name} key={error.name} />;

          const { previousChapter, error: previousError } = await getPreviousChapter(chapter.id, course.id)
          if (previousError)
            return <ErrorPage name={previousError.name} key={previousError.name} />;

          //get previous chapter user progress
          const { userChapterProgress: previousUserChapterProgress, error: progressError } =
            await getUserChapterProgress(userId, previousChapter?.id ?? "")
          if (progressError)
            return <ErrorPage name={progressError.name} key={progressError.name} />;


          return (
            <ChapterAccordion
              key={chapter.id}
              id={chapter.id}
              title={chapter.title}
              isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
              courseId={course.id}
              parentId={parentId}
              isLocked={
                (previousChapter && !previousUserChapterProgress?.isCompleted) ||
                !chapter.isPublished
              }
              sessions={chapter.sessions ?? []}
              chapterProgress={chapterProgressPercentage ?? 0}
              previousUserChapterProgress={previousUserChapterProgress}
              prviousChapter={previousChapter}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CourseSidebar;
