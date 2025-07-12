"use client";
import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";
import Heading from "@/components/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { ChapterAndSessions } from "../../../components/chapter-sessions";
import { Scholarship } from "@prisma/client";


export type CourseSidebarProps = {
  course: CourseChaptersUserProgressType;
  progressPercentage: number;
  purchasePercentage: number;
  paidPositions: number[];
};

function SingleCourseMobileSidebar({
  course,
  purchasePercentage,
  paidPositions,
  progressPercentage,
  coursePurchasePrice,
 scholarship
}: {
  course: CourseChaptersUserProgressType;
 scholarship: Scholarship | null;
  coursePurchasePrice: number;
  paidPositions: number[];
  progressPercentage: number;
  purchasePercentage: number;
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
        {!scholarship && (
          <PaymentProgress
            size="sm"
            courseId={course.id}
          />
        )}
       

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
          {course.chapters.map((chapter) => (
            <ChapterAndSessions chapter={chapter} key={chapter.id} />
          ))}
        </>
      ) : (
        <Skeleton className="w-full h-[500px]" />
      )}
    </div>
  );
}

export default SingleCourseMobileSidebar;
