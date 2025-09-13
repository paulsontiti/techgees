import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import Heading from "@/components/heading";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";

import { Skeleton } from "@/components/ui/skeleton";
import { ChapterAndSessions } from "./chapter-sessions";
import { SingleCourseEnrollButton } from "./single-course-enroll-button";
import { Scholarship } from "@prisma/client";
import { getChapterProgress } from "../../../../../../../actions/getChapterProgress";
import ErrorPage from "@/components/error";
import { getUserChapterProgress } from "../../../../../../../actions/getUserChapterProgress";

export type CourseSidebarProps = {
  progressPercentage: number;
  purchasePercentage: number;
  paidPositions: number[];
  courseId: string;
};

async function CourseSidebar({
  course,
  progressPercentage,
  scholarship,
  url,
  userId
}: {
  course: CourseChaptersUserProgressType;
  scholarship: Scholarship | null;
  url: string;
  userId: string;
  progressPercentage: number;
}) {
  return (
    <div className="h-full bg-white mt-4 px-4 border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="py-8 px-2 flex flex-col border-b">
        <div className="flex items-center justify-between mb-4">
          {course !== undefined ? (
            <Heading type={1} text={course.title} className="font-semibold" />
          ) : (
            <Skeleton className="w-full h-5" />
          )}

          <CourseActioDropdownMenu courseId={course.id} />
        </div>

        {!scholarship && <PaymentProgress courseId={course.id} size="sm" />}

        {/* Payment button */}
        <div className="my-2">
          <SingleCourseEnrollButton
            courseId={course.id}
            scholarship={scholarship}
            userId={userId}
            url={url}
          />
        </div>

        <div className="mt-10">
          {progressPercentage !== undefined ? (
            <CourseProgress variant="success" value={progressPercentage} />
          ) : (
            <Skeleton className="w-full h-10" />
          )}
        </div>
      </div>
      {course ? (
        <>
          {course.chapters.map(async (chapter) => {
            const prevChapter = course.chapters[chapter.position - 1];
            //get previous chapter user progress
                 const { userChapterProgress: previousUserChapterProgress, error: progressError } =
                 await getUserChapterProgress(userId, prevChapter?.id ?? "")
                 if (progressError) return <ErrorPage name={progressError.name} key={progressError.name}/>;

            const { progressPercentage: chapterProgressPercentage, error } =
              await getChapterProgress(userId, chapter.id);
            if (error) return <ErrorPage name={error.name} key={error.name}/>;
            return (
              <ChapterAndSessions
                chapter={chapter}
                key={chapter.id}
                previousChapter={prevChapter}
                previousUserChapterComplete={previousUserChapterProgress?.isCompleted || false}
                chapterProgressPercentage={chapterProgressPercentage}
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

export default CourseSidebar;
