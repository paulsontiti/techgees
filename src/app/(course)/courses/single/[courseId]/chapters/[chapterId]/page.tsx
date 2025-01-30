
import React from "react";
import ChapterProgress from "./_components/chapter-progress";
import PurchaseWarning from "./_components/purchase-warning";
import ChapterDetails from "./_components/chapter-details";
import VerifyPayment from "@/app/(course)/courses/components/verify-payment";

  function ChapterIdPage({
  params: { courseId, chapterId },
  searchParams: { reference,redirectUrl },
}: {
  params: { courseId: string; chapterId: string };
  searchParams: { reference: string,redirectUrl:string };
}) {

  return (
    <div>
      <VerifyPayment redirectUrl={redirectUrl} reference={reference}/>
     <ChapterProgress chapterId={chapterId}/>
      <PurchaseWarning chapterId={chapterId}/>
     <ChapterDetails chapterId={chapterId} courseId={courseId}/>
    </div>
  );
}

export default ChapterIdPage;
