
"use client"
import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";
import Heading from "@/components/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { ChapterAndSessions } from "./chapter-sessions";
import { Chapter, Scholarship } from "@prisma/client";
import { SidebarChapter } from "../../../combo/[courseId]/child/_components/course-menu-mobile-sidebar";
import useIsPreviousChapterComplete from "../../../../../../../hooks/useIsPreviousChapterComplete";
import useChapterprogressPercentage from "../../../../../../../hooks/useChapterprogressPercentage";

export type CourseSidebarProps = {
  course: CourseChaptersUserProgressType;
  progressPercentage: number;
  purchasePercentage: number;
};

function SingleCourseMobileSidebar({
  course,
  progressPercentage,
  scholarship,
}: {
  course: CourseChaptersUserProgressType;
  scholarship: Scholarship | null;
  progressPercentage: number;
}) {


  return (
    <div className="h-full bg-white mt-4 px-4 border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="py-8 px-2 flex flex-col border-b gap-y-2">
        <div className="flex items-center justify-between">
          {course ? (
            <Heading type={1} text={course?.title} className="font-semibold" />
          ) : (
            <Skeleton className="w-full h-10" />
          )}

          {course ? (
            <CourseActioDropdownMenu courseId={course.id} />
          ) : (
            <Skeleton className="w-1 h-1" />
          )}
        </div>
        {!scholarship && <PaymentProgress size="sm" courseId={course.id} />}

        <div className="mt-10">
          {progressPercentage !== undefined ? (
            <CourseProgress variant="success" value={progressPercentage} />
          ) : (
            <Skeleton className="w-full h-10 my-2" />
          )}
        </div>
      </div>
      {course ? (
        <>
          {course.chapters.map((chapter) => {
            const prevChapter = course.chapters[chapter.position - 1];
           
            return (
              <MobileChapter
                key={chapter.id}
                chapter={chapter}
                prevChapter={prevChapter}
              />
            );
          })}
        </>
      ) : (
        <Skeleton className="w-full h-[500px]" />
      )}
    </div>
  );
}

export default SingleCourseMobileSidebar;

function MobileChapter({
  chapter,
  prevChapter,
}: {
  chapter: SidebarChapter;
  prevChapter: Chapter;
}) {
  const {IsPreviousChapterComplete} = useIsPreviousChapterComplete(chapter.courseId,chapter.id)

  const {chapterprogressPercentage} = useChapterprogressPercentage(chapter.courseId,chapter.id)

 

  return (
    <ChapterAndSessions
      chapter={chapter}
      key={chapter.id}
      previousChapter={prevChapter}
      previousUserChapterComplete={IsPreviousChapterComplete}
      chapterProgressPercentage={chapterprogressPercentage}
    />
  );
}
