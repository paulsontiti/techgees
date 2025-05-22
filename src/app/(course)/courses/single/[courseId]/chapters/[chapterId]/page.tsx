
import React from "react";
import ChapterProgress from "./_components/chapter-progress";
import PurchaseWarning from "./_components/purchase-warning";
import ChapterDetails from "./_components/chapter-details";
import VerifyPayment from "@/app/(course)/courses/components/verify-payment";
import { isOnScholarship } from "../../../../../../../../actions/isOnScholarship";
import ErrorPage from "@/components/error";

 async function ChapterIdPage({
  params: { courseId, chapterId },
  searchParams: { reference,redirectUrl },
}: {
  params: { courseId: string; chapterId: string };
  searchParams: { reference: string,redirectUrl:string };
}) {

  const {onScholarship,error} = await isOnScholarship(courseId);
  if(error) return <ErrorPage name={error.name}/>

  return (
    <div>
      
      <VerifyPayment redirectUrl={redirectUrl} reference={reference}/>
     <ChapterProgress chapterId={chapterId}/>
      {
        !onScholarship && <PurchaseWarning chapterId={chapterId}/>
      }
     <ChapterDetails
     onScholarship={onScholarship}
     chapterId={chapterId} courseId={courseId}/>
    </div>
  );
}

export default ChapterIdPage;
