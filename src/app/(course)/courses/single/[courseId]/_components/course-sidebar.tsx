import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import Heading from "@/components/heading";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";

import { Skeleton } from "@/components/ui/skeleton";
import { ChapterAndSessions } from "../../../components/chapter-sessions";
import { SingleCourseEnrollButton } from "./single-course-enroll-button";
import { Scholarship } from "@prisma/client";

export type CourseSidebarProps = {
  progressPercentage: number;
  purchasePercentage: number;
  paidPositions: number[];
  courseId: string;
};

async function CourseSidebar({
  course,
  progressPercentage,
  scholarship,url,userId
}: {
  course: CourseChaptersUserProgressType;
  scholarship: Scholarship | null;
  url:string,
  userId:string;
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
  
            {!scholarship &&
                <PaymentProgress
                courseId={course.id}
                  size="sm"
                />}

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

export default CourseSidebar;
