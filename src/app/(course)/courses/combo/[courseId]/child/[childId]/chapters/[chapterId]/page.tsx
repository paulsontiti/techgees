import React from "react";
import ChapterProgress from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/chapter-progress";
import ChapterDetails from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/chapter-details";
import { isOnScholarship } from "../../../../../../../../../../actions/isOnScholarship";
import ErrorPage from "@/components/error";
import { getChapterDetails } from "../../../../../../../../../../actions/getChapterdetails";

async function ChapterIdPage({
    params: { childId, chapterId }
}: {
    params: { childId: string; chapterId: string };

}) {

        const {onScholarship,error} = await isOnScholarship(childId);
    if(error) return <ErrorPage name={error.name}/>

    const {chapterDetails,error:chapterErr} = await getChapterDetails(chapterId);
      if(chapterErr) return <ErrorPage name={chapterErr.name}/>

    return (
        <div className="bg-white p-4" id="top">

            <ChapterProgress chapterId={chapterId} />
            <ChapterDetails 
            chapterDetails={chapterDetails}
            onScholarship={onScholarship}
            chapterId={chapterId} courseId={childId} isChildCourse={true} />
        </div>
    );
}

export default ChapterIdPage;
