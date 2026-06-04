
import React from "react";
import ChapterProgress from "./_components/chapter-progress";
import ChapterDetails from "./_components/chapter-details";
import ErrorPage from "@/components/error";
import { getChapterDetails } from "../../../../../../../../actions/getChapterdetails";

 async function ChapterIdPage({
  params: { courseId, chapterId },
  searchParams: { reference,redirectUrl },
}: {
  params: { courseId: string; chapterId: string };
  searchParams: { reference: string,redirectUrl:string };
}) {



  const {chapterDetails,error:chapterErr} = await getChapterDetails(chapterId);
  if(chapterErr) return <ErrorPage name={chapterErr.name}/>


  return (
    <div>
      
      {/* <VerifyPayment redirectUrl={redirectUrl} reference={reference}/> */}
     <ChapterProgress chapterId={chapterId}/>
      {/* {
        !onScholarship && <PurchaseWarning chapterId={chapterId}/>
      } */}
     <ChapterDetails
     chapterDetails={chapterDetails}
     chapterId={chapterId} courseId={courseId}/>
    </div>
  );
}

export default ChapterIdPage;
