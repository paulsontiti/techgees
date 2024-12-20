
import React from "react";
import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { ChapterAccordion } from "./chapter-accordion";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import { CourseChaptersUserProgressType, getCourseChaptersUserProgress } from "../../../../../../../actions/getCourseChaptersUserProgress";
import Heading from "@/components/heading";
import { getChapterProgress } from "../../../../../../../actions/getChapterProgress";
import ErrorPage from "@/components/error";
import { getPreviousChapter } from "../../../../../../../actions/getPreviousChapter";
import { getUserChapterProgress } from "../../../../../../../actions/getUserChapterProgress";
import { getUserCookie } from "@/lib/get-user-cookie";
import { redirect } from "next/navigation";
import { getCourseProgress } from "../../../../../../../actions/getCourseProgress";
import { getPurchasePercentage } from "../../../../../../../actions/getPurchasePercentage";
import { getPaidChapterPositions } from "../../../../../../../actions/getPaidChapterPositions";
import { hasLikedCourse } from "../../../../../../../actions/hasLikedCourse";
import { hasDisLikedCourse } from "../../../../../../../actions/hasDisLikedCourse";
import { hasRatedCourse } from "../../../../../../../actions/hasRatedCourse";

export type CourseSidebarProps = {
  course: CourseChaptersUserProgressType;
  progressPercentage: number;
  purchasePercentage: number;
  paidPositions:number[],
  hasLiked:boolean,
  hasDisLiked:boolean,
  hasRated:boolean,
};

async function CourseSidebar({
  courseId,
}: {courseId:string}) {
  
const userId = await getUserCookie() ?? "";
const { course, error: courseError } = await getCourseChaptersUserProgress(
  userId,
  courseId
);

if (courseError) return <ErrorPage name={courseError.name} />;
if (!course) return redirect("/");

  const { progressPercentage, error } = await getCourseProgress(
    userId,
    courseId
  );
  if (error) return <ErrorPage name={error.name} />;



  const { purchasePercentage, error: purschaseError } = await getPurchasePercentage(courseId, userId)
  if (purschaseError) return <ErrorPage name={purschaseError.name} />;

const { paidPositions, error:paidPositionError } = await getPaidChapterPositions(
  courseId,
  purchasePercentage
);
if (paidPositionError) return <ErrorPage name={paidPositionError.name} />;

const { hasLiked, error: hasLikedError } = await hasLikedCourse(
  courseId,
  userId
);
if (hasLikedError)
  return <ErrorPage name={hasLikedError.name} />;

const { hasDisLiked, error: hasDisLikedError } = await hasDisLikedCourse(
  courseId,
  userId
);
if (hasDisLikedError)
  return <ErrorPage name={hasDisLikedError.name} />;

const { hasRated, error: ratedError } = await hasRatedCourse(
  courseId,
  userId
);
if (ratedError) return <ErrorPage name={ratedError.name} />;


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
          <CourseProgress variant="success" value={progressPercentage ?? 0} />

        </div>
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map(async(chapter) => {
          const { progressPercentage:chapterProgressPercentage, error } = await getChapterProgress(
            userId,
            chapter.id
          );

          if (error)
            return <ErrorPage name={error.name} key={error.name} />;

          const chapterPaidFor = paidPositions.indexOf(chapter.position);

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
                (previousChapter && !previousUserChapterProgress?.isCompleted) ||
                ((!chapter.isPublished || !chapter.isFree)
                  && chapterPaidFor < 0)
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
