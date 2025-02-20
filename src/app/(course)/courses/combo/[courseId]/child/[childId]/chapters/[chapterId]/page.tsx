import React from "react";
import ChapterProgress from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/chapter-progress";
import ChapterDetails from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/chapter-details";

function ChapterIdPage({
    params: { childId, chapterId }
}: {
    params: { childId: string; chapterId: string };

}) {

    return (
        <div className="bg-white p-4" id="top">

            <ChapterProgress chapterId={chapterId} />
            <ChapterDetails chapterId={chapterId} courseId={childId} isChildCourse={true} />
        </div>
    );
}

export default ChapterIdPage;
