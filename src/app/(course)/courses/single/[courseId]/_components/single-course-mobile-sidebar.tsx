"use client";
import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";
import Heading from "@/components/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { ChapterAndSessions } from "./chapter-sessions";
import { SidebarChapter } from "../../../combo/[courseId]/child/_components/course-sidebar";
import { useEffect, useState } from "react";
import { SubscriptionType } from "../../../../../../../actions/getCourseSubscription";
import toast from "react-hot-toast";
import axios from "axios";
import SubscriptionDetails from "../../../components/subscription-details";
import { SingleCourseEnrollButton } from "./single-course-enroll-button";
import { SubscriptionButton } from "../../../components/subscription-button";

export type CourseSidebarProps = {
  course: CourseChaptersUserProgressType;
  progressPercentage: number;
  purchasePercentage: number;
};

function SingleCourseMobileSidebar({
  course,
  progressPercentage,
}: {
  course: CourseChaptersUserProgressType;
  progressPercentage: number;
}) {
  const [subscription, setSubscription] = useState<
    SubscriptionType | undefined | null
  >(undefined);
  const [purchasePercentage, setPurchasePercentage] = useState<
    number | undefined
  >(undefined);

  const [paidPositions, setPaidPositions] = useState<number[]>([]);

  const fetchSubscription = async () => {
    try {
      const res = await axios.get(`/api/courses/${course.id}/subscription`);

     
      if (res.data) {
        setSubscription(res.data);
      } else {
        const res = await axios.get(
          `/api/courses/${course.id}/purchase-percentage`,
        );
        setPurchasePercentage(res.data);

        const resPaid = await axios.get(
          `/api/courses/${course.id}/paid-chapters-positions`,
        );
        setPaidPositions(resPaid.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);


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
        {purchasePercentage !== undefined && (
          <PaymentProgress courseId={course.id} size="sm" />
        )}

        {subscription && (
         
          <SubscriptionDetails
            maxChapters={subscription.maxChapters}
            expiresAt={new Date(subscription.expiringDate)}
          />
        )}

        {/* Payment button */}
        {!subscription && purchasePercentage !== undefined && purchasePercentage < 100 && (
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
            <Skeleton className="w-full h-10 my-2" />
          )}
        </div>
      </div>
      {course ? (
        <>
          {course.chapters.map((chapter) => {
            return (
              <MobileChapter
                courseId={course.id}
                key={chapter.id}
                chapter={chapter}
                paidFor={paidPositions?.includes(chapter.position)}
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
  courseId,
  paidFor,
}: {
  chapter: SidebarChapter;
  courseId: string;
  paidFor: boolean;
}) {
  return (
    <ChapterAndSessions
      courseId={courseId}
      chapter={chapter}
      key={chapter.id}
      paidFor={paidFor}
    />
  );
}
