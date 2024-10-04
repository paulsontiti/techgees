import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ErrorPage from "@/components/error";
import CourseProgress from "@/components/course-progress";
import { Chapter, Course, Session, UserProgress } from "@prisma/client";
import { hasLikedCourse } from "../../../../../../../../actions/hasLikedCourse";
import { hasDisLikedCourse } from "../../../../../../../../actions/hasDisLikedCourse";
import { hasRatedCourse } from "../../../../../../../../actions/hasRatedCourse";
import { CourseActioDropdownMenu } from "@/app/(course)/courses/single/[courseId]/_components/action-dropdown-menu";
import { getChapterProgress } from "../../../../../../../../actions/getChapterProgress";
import { getPreviousChapter } from "../../../../../../../../actions/getPreviousChapter";
import { getUserChapterProgress } from "../../../../../../../../actions/getUserChapterProgress";
import { ChapterAccordion } from "@/app/(course)/courses/single/[courseId]/_components/chapter-accordion";

type CourseSidebarProps = {
  course: Course;
  chapters: (Chapter & {
    sessions: Session[],
    userProgresses: UserProgress[]

  })[],
  progressPercentage: number;
};

async function CourseSidebar({
  course, chapters,
  progressPercentage
}: CourseSidebarProps) {
  const { userId } = auth();
  if (!userId) return redirect("/");



  const { hasLiked, error: hasLikedError } = await hasLikedCourse(
    course.id,
    userId
  );
  if (hasLikedError)
    return <ErrorPage name={hasLikedError.name} />;

  const { hasDisLiked, error: hasDisLikedError } = await hasDisLikedCourse(
    course.id,
    userId
  );
  if (hasDisLikedError)
    return <ErrorPage name={hasDisLikedError.name} />;

  const { hasRated, error: ratedError } = await hasRatedCourse(
    course.id,
    userId
  );
  if (ratedError) return <ErrorPage name={ratedError.name} />;



  return (
    <div className="h-full mt-4 border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="py-8 px-2 flex flex-col border-b">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">{course.title}</h1>
          <CourseActioDropdownMenu
            courseId={course.id}
            hasDisLiked={hasDisLiked}
            hasLiked={hasLiked}
            hasRated={hasRated}
          />
        </div>

        <div className="mt-10">
          <CourseProgress variant="success" value={progressPercentage} />

        </div>
      </div>
      <div className="flex flex-col w-full">
        {chapters.map(async (chapter) => {
          const { progressPercentage, error } = await getChapterProgress(
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
              isLocked={
                previousChapter && !previousUserChapterProgress?.isCompleted ||
                ((!chapter.isPublished || !chapter.isFree))
              }
              sessions={chapter.sessions ?? []}
              chapterProgress={progressPercentage ?? 0}
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
