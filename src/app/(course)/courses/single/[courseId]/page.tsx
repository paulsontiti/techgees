import React from "react";
import ErrorPage from "@/components/error";
import { redirect } from "next/navigation";
import CourseDetails from "./_components/course-details";
import CourseCompletedProgress from "./_components/course-completed-progress";
import { getCourseChaptersUserProgress } from "../../../../../../actions/getCourseChaptersUserProgress";
import { getUserCookie } from "@/lib/get-user-cookie";
import { PurchaseType } from "@prisma/client";
import { getPurchasePercentage } from "../../../../../../actions/getPurchasePercentage";
import { SingleCourseEnrollButton } from "./_components/single-course-enroll-button";
import { SubscriptionButton } from "../../components/subscription-button";
import PaymentProgress from "@/components/paymentProgress";
import SubscriptionDetails from "../../components/subscription-details";
import { getPaidChapterPositions } from "../../../../../../actions/getPaidChapterPositions";
import {
  getCourseSubscription,
  SubscriptionType,
} from "../../../../../../actions/getCourseSubscription";
import { getCourseProgress } from "../../../../../../actions/getCourseProgress";
import CourseProgress from "@/components/course-progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-separator";
import { Preview } from "@/components/preview";
import ChapterCard from "@/components/chapter-card";
import PayButton from "@/components/pay-button";
import { db } from "@/lib/db";

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

   let subscription: SubscriptionType = null;
  let purchasePercentage;
  let paidPositions: number[] = [];
  try {
    subscription = await getCourseSubscription(courseId, userId);
    // if (subscription) {
    //   for (let i = 0; i < (subscription?.maxChapters || 30); i++) {
    //     paidPositions.push(i);
    //   }
    // }
  } catch (error: any) {
    if (error) return <ErrorPage name={error.name} />;
  }

  if (!subscription) {
    const data = await getPurchasePercentage(courseId, userId as string);
    purchasePercentage = data.purchasePercentage;
    if (data.error) return <ErrorPage name={data.error.name} />;

    const paid = await getPaidChapterPositions(courseId, purchasePercentage);
    paidPositions = paid.paidPositions;

    if (paid.error) return <ErrorPage name={paid.error.name} />;
  }
  const { progressPercentage, error: proError } = await getCourseProgress(
    userId!,
    courseId,
  );
  if (proError) return <ErrorPage name={proError.name} />;

  const userProgress = await db.userProgress.findFirst({
              where: {
        
                userId,
                courseId,
              },select:{
                  isCompleted:true
              }
  
            });

   //calculate the amount paid for this course
    const amountPaid= ((purchasePercentage ?? 0) / 100) * course.price!

    const paidChapters= paidPositions?.length ?? 0

  return (
    <section className="bg-[#07152f] flex flex-col gap-4 p-8 text-white">
      {/* <VerifyPayment
        redirectUrl={redirectUrl}
        reference={reference}
        userId={userId}
        courseId={courseId}
        purchaseType={purchaseType}
      /> */}

      <section
        className="
        flex flex-col max-w-4xl mx-auto pb-20"
      >
        <CourseCompletedProgress courseCompleted={!!userProgress} />
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
        </div>
        <Separator />
        <div>
          <Preview value={course.description || ""} />
        </div>
        {/* <ChapterSessionDetails
        sessionLength={chapterDetails.chapter?.sessions.length || 0}
        duration={duration}
      />

      <ChapterComments chapterId={chapterId} /> */}

        <Separator />
        <div className="my-4 bg-white p-2">
          {purchasePercentage !== undefined && (
            <PaymentProgress purchasePercentage={purchasePercentage} amountPaid={amountPaid} paidChapters={paidChapters} size="sm" />
          )}

          {subscription && (
            <SubscriptionDetails expiresAt={subscription.expiringDate} />
          )}
         

          {purchasePercentage !== undefined && purchasePercentage < 100 && (
            <PayButton price={course.price!}/>
            // <div className="flex flex-col md:flex-row gap-4">
            //   <SingleCourseEnrollButton
            //     courseId={courseId}
            //     coursePrice={course.price!}
            //     purchasePercentage={purchasePercentage}
            //   />
            //   <SubscriptionButton
            //     singleOrCombo="single"
            //     courseId={courseId}
            //     subscriptionPrice={course.subscriptionPrice || 10000}
            //   />
            // </div>
          )}
        </div>

        <div className="mt-4 mx-auto max-w-7xl px-5 lg:px-8">
          
           <div className="mb-10">
            {progressPercentage !== undefined ? (
              <CourseProgress variant="success" value={progressPercentage!} />
            ) : (
              <Skeleton className="w-full h-10" />
            )}
          </div>
          <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {course.chapters.map(async (chapter, index) => {
              //if there is subscription, then all chapters are paid for the duration of the subscription
              const paidFor = subscription
                ? true
                : paidPositions.includes(chapter.position);
              return (
                <ChapterCard
                  parentId=""
                  isLocked={
                    (!chapter.isFree && !paidFor) || !chapter.isPublished
                  }
                  chapter={chapter}
                  isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
                />
              );
            })}
          </div>
        </div>

        {/* {completedLastSession === undefined ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <>
          {completedLastSession &&
            chapterDetails.userProgress === null &&
            randonQuestions.length > 0 && (
              <ChapterTest
                questions={randonQuestions}
                chapterId={chapterDetails.chapter?.id || ""}
                chapterUrl={`/courses/single/${courseId}/chapters/${chapterId}`}
              />
            )}
        </>
      )} */}
      </section>
    </section>
  );
}

export default CourseIdPage;
