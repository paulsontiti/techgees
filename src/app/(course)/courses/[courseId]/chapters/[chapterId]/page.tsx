import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { getChapterCoursePurchaseUserProgressNextChapter } from "../../../../../../../actions/getChapterCoursePurchaseUserProgressNextChapter";
import ErrorPage from "@/components/error";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { CourseEnrollButton } from "./_components/enroll-button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { getPayStackPayment } from "../../../../../../../actions/getPayStackPayment";


async function ChapterIdPage({
  params: { courseId, chapterId },
  searchParams:{reference}
}: {
  params: { courseId: string; chapterId: string };
  searchParams:{reference:string}
}) {


  const { userId } = auth();
  if (!userId) return redirect("/");

  const { course, chapter, nextChapter, totalAmountPaid, userProgress, error } =
    await getChapterCoursePurchaseUserProgressNextChapter({
      userId,
      courseId,
      chapterId,
    });
  if (error) return <ErrorPage message={error.message} />;

  if (!course || !chapter) return redirect("/");
  
  let payment = null;

  if(reference){
   const {paystack,error} = await getPayStackPayment(reference)
   if (error) return <ErrorPage message={error.message} />;
    if(paystack){
      payment = {
        amount:paystack.amount,
        status:paystack.payment_status
      }
    }
  }


  const purchasePercentage = (totalAmountPaid/course.price!) * 100

  const isLocked = !chapter.isFree && totalAmountPaid === 0;
  const completeOnEnd = purchasePercentage === 0 && !userProgress?.isCompleted;
  return (
    <div>
      {payment && <Banner
          variant={payment.status === "success" ? "success" : "warning"}
          label={`You payment of ${formatPrice(payment.amount)} is ${payment.status === "success" ? "successful" : "been processed"}`}
        />}
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You have to purchase this course in order to watch this chapter."
        />
      )}
      <div
        className="
        flex flex-col max-w-4xl mx-auto pb-20"
      >
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {purchasePercentage !== 100 && (
            <CourseEnrollButton courseId={courseId} chapterId={chapterId}
            label={purchasePercentage === 0 ? `Enroll for ${formatPrice(course.price!)}` :
             `Pay ${formatPrice(((100 - purchasePercentage)/100)*course.price!)}`}
            />
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description ?? ""} />
        </div>
      </div>
    </div>
  );
}

export default ChapterIdPage;
