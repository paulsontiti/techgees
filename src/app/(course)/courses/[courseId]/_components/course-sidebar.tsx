import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { CourseChaptersUserProgressType } from "../../../../../../actions/getCourseChaptersUserProgress";
import ErrorPage from "@/components/error";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";
import { getChapterProgress } from "../../../../../../actions/getChapterProgress";
import PaymentProgress from "@/components/paymentProgress";
import { getPaidChapterPositions } from "../../../../../../actions/getPaidChapterPositions";
import { ChapterAccordion } from "./chapter-accordion";

type CourseSidebarProps = {
  course: CourseChaptersUserProgressType;
  progressPercentage: number;
  purchasePercentage: number;
};

async function CourseSidebar({
  course,
  progressPercentage,
  purchasePercentage,
}: CourseSidebarProps) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { paidPositions, error } = await getPaidChapterPositions(
    course.id!,
    purchasePercentage
  );
  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
    <div className="p-8 flex flex-col border-b">
        <div className="flex items-center ">
          <h1 className="font-semibold">{course.title}</h1>
          <PaymentProgress value={purchasePercentage} size="sm" />
        </div>

        <div className="mt-10">
          <CourseProgress variant="success" value={progressPercentage} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map(async (chapter) => {
          const { progressPercentage, error } = await getChapterProgress(
            userId,
            chapter.id
          );

          if (error)
            return <ErrorPage message={error.message} key={error.name} />;

          const chapterPaidFor = paidPositions.indexOf(chapter.position);

          return (
            <ChapterAccordion
              key={chapter.id}
              id={chapter.id}
              title={chapter.title}
              isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={(!chapter.isPublished || !chapter.isFree) && chapterPaidFor < 0}
              sessions={chapter.sessions ?? []}
              chapterProgress={progressPercentage ?? 0}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CourseSidebar;
