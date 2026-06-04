import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import Heading from "@/components/heading";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";

import { Skeleton } from "@/components/ui/skeleton";
import { ChapterAndSessions } from "./chapter-sessions";
import { SingleCourseEnrollButton } from "./single-course-enroll-button";

import ErrorPage from "@/components/error";

import { getPurchasePercentage } from "../../../../../../../actions/getPurchasePercentage";
import {
  getCourseSubscription,
  SubscriptionType,
} from "../../../../../../../actions/getCourseSubscription";
import { getPaidChapterPositions } from "../../../../../../../actions/getPaidChapterPositions";
import { SubscriptionButton } from "../../../components/subscription-button";
import SubscriptionDetails from "../../../components/subscription-details";

export type CourseSidebarProps = {
  progressPercentage: number;
  purchasePercentage: number;
  paidPositions: number[];
  courseId: string;
};

async function CourseSidebar({
  course,
  progressPercentage,
  userId,
}: {
  course: CourseChaptersUserProgressType;
  userId: string;
  progressPercentage: number;
}) {
  let subscription: SubscriptionType = null;
  let purchasePercentage;
  let paidPositions: number[] = [];
  try {
    subscription = await getCourseSubscription(course.id, userId);
    if (subscription) {
      for (let i = 0; i < (subscription?.maxChapters || 30); i++) {
        paidPositions.push(i);
      }
    }
  } catch (error: any) {
    if (error) return <ErrorPage name={error.name} />;
  }

  if (!subscription) {
    const data = await getPurchasePercentage(course.id, userId as string);
    purchasePercentage = data.purchasePercentage;
    if (data.error) return <ErrorPage name={data.error.name} />;

    const paid = await getPaidChapterPositions(course.id, purchasePercentage);
    paidPositions = paid.paidPositions;

    if (paid.error) return <ErrorPage name={paid.error.name} />;
  }

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

        {purchasePercentage !== undefined && (
          <PaymentProgress courseId={course.id} size="sm" />
        )}

        {subscription && (
          <SubscriptionDetails
            maxChapters={subscription.maxChapters}
            expiresAt={subscription.expiringDate}
          />
        )}
        {/* Payment button */}
        {!subscription &&
          purchasePercentage !== undefined &&
          purchasePercentage < 100 && (
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <SingleCourseEnrollButton
                courseId={course.id}
                coursePrice={course.price!}
                purchasePercentage={purchasePercentage || 0}
              />
              <SubscriptionButton
                courseId={course.id}
                subscriptionPrice={course.subscriptionPrice || 10000}
              />
            </div>
          )}

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
            //if there is subscription, then all chapters are paid for the duration of the subscription
            const paidFor = paidPositions.includes(chapter.position);

            return (
              <ChapterAndSessions
                courseId={course.id}
                chapter={chapter}
                key={chapter.id}
                paidFor={paidFor}
                // previousChapter={prevChapter}
                // previousUserChapterComplete={
                //   previousUserChapterProgress?.isCompleted || false
                // }
                // chapterProgressPercentage={chapterProgressPercentage}
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
