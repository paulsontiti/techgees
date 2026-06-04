import React from "react";
import ErrorPage from "@/components/error";
import { redirect } from "next/navigation";
import VerifyPayment from "../../components/verify-payment";
import CourseDetails from "./_components/course-details";
import CourseCompletedProgress from "./_components/course-completed-progress";
import { SingleCourseEnrollButton } from "./_components/single-course-enroll-button";
import { getCourseChaptersUserProgress } from "../../../../../../actions/getCourseChaptersUserProgress";
import { getUserCookie } from "@/lib/get-user-cookie";
import { SubscriptionButton } from "../../components/subscription-button";
import { getPurchasePercentage } from "../../../../../../actions/getPurchasePercentage";
import { PurchaseType } from "@prisma/client";

async function CourseIdPage({
  params: { courseId },
  searchParams: { reference, redirectUrl, purchaseType },
}: {
  params: { courseId: string };
  searchParams: {
    reference: string;
    redirectUrl: string;
    purchaseType: PurchaseType;
  };
}) {
  const userId = await getUserCookie();
  if (!userId) return redirect("/login");

  const { course, error } = await getCourseChaptersUserProgress(
    userId!,
    courseId,
  );
  if (error) return <ErrorPage name={error.name} />;

  // const { purchasePercentage, error: percentageErr } =
  //   await getPurchasePercentage(courseId, userId as string);
  // if (percentageErr) return <ErrorPage name={percentageErr.name} />;

  if (!course) return redirect("/dashboard");

  return (
    <div className="flex flex-col gap-4">
      <VerifyPayment
        redirectUrl={redirectUrl}
        reference={reference}
        userId={userId}
        courseId={courseId}
        purchaseType={purchaseType}
      />
      <CourseCompletedProgress courseId={courseId} />

      {/* {purchasePercentage < 100 && (
        <div className="flex flex-col md:flex-row gap-4">
          <SingleCourseEnrollButton
            courseId={courseId}
            coursePrice={course.price!}
            purchasePercentage={purchasePercentage}
          />
          <SubscriptionButton
            courseId={courseId}
            subscriptionPrice={course.subscriptionPrice || 10000}
          />
        </div>
      )} */}

      <CourseDetails course={course} />
    </div>
  );
}

export default CourseIdPage;
