
import React from "react";
import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { ChapterAccordion } from "./chapter-accordion";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";
import Heading from "@/components/heading";
import { Course } from "@prisma/client";

export type CourseSidebarProps = {
  course: Course //CourseChaptersUserProgressType | null;
  progressPercentage: number;
  purchasePercentage: number;
  paidPositions:number[],
  hasLiked:boolean,
  hasDisLiked:boolean,
  hasRated:boolean,
};

function CourseSidebar({
  course,
  progressPercentage,
  purchasePercentage,hasDisLiked,hasLiked,hasRated,paidPositions
}: CourseSidebarProps) {
  



  return (
    <div className="h-full bg-white mt-4 px-4 border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="py-8 px-2 flex flex-col border-b">
        <div className="flex items-center justify-between">
          <Heading type={1} text={course.title} className="font-semibold"/>
          
          <CourseActioDropdownMenu
            courseId={course.id}
            hasDisLiked={hasDisLiked}
            hasLiked={hasLiked}
            hasRated={hasRated}
          />
        </div>
        {!course.isFree && <PaymentProgress value={purchasePercentage} size="sm" amountPaid={(purchasePercentage / 100) * course.price!} />}
        <div className="mt-10">
          <CourseProgress variant="success" value={progressPercentage} />

        </div>
      </div>
      {/* <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => {
          // const { progressPercentage, error } = await getChapterProgress(
          //   userId,
          //   chapter.id
          // );

          // if (error)
          //   return <ErrorPage name={error.name} key={error.name} />;

          const chapterPaidFor = paidPositions.indexOf(chapter.position);

          // const { previousChapter, error: previousError } = await getPreviousChapter(chapter.id, course.id)
          // if (previousError)
          //   return <ErrorPage name={previousError.name} key={previousError.name} />;

          // //get previous chapter user progress
          // const { userChapterProgress: previousUserChapterProgress, error: progressError } =
          //   await getUserChapterProgress(userId, previousChapter?.id ?? "")
          // if (progressError)
          //   return <ErrorPage name={progressError.name} key={progressError.name} />;


          return (
            <ChapterAccordion
              key={chapter.id}
              id={chapter.id}
              title={chapter.title}
              isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={
                (chapter.previousChapter && !chapter.previousUserChapterProgress?.isCompleted) ||
                ((!chapter.isPublished || !chapter.isFree)
                  && chapterPaidFor < 0)
              }
              sessions={chapter.sessions ?? []}
              chapterProgress={chapter.chapterProgressPercentage ?? 0}
              previousUserChapterProgress={chapter.previousUserChapterProgress}
              prviousChapter={chapter.previousChapter}
            />
          );
        })}
      </div> */}
    </div>
  );
}

export default CourseSidebar;
