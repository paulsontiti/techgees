"use client"
import { SidebarChapter } from "../../../combo/[courseId]/child/_components/course-sidebar";
import { ChapterAccordion } from "../../../combo/[courseId]/child/_components/chapter-accordion";
import { Chapter } from "@prisma/client";
import usePaidChapterPositions from "../../../../../../../hooks/usePaidChapterPositions";

type ChapterAndSessionsParamType ={
chapter: SidebarChapter, parentId?: string,
chapterProgressPercentage:number,
previousChapter:Chapter,
previousUserChapterComplete:boolean,

}

export const ChapterAndSessions = ({ chapter, parentId,
  chapterProgressPercentage,previousChapter,previousUserChapterComplete
}: ChapterAndSessionsParamType) => {

  const {paidPositions} = usePaidChapterPositions(chapter.courseId)
  const paidFor = paidPositions.includes(chapter.position)


  return (
    <ChapterAccordion
      key={chapter.id}
      id={chapter.id}
      title={chapter.title}
      isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
      courseId={chapter.courseId}
      parentId={parentId || ""}

      isLocked={
       (!chapter.isFree && !paidFor) ||
          ((previousChapter && !previousUserChapterComplete) ||
            !chapter.isPublished) 
      }
      sessions={chapter.sessions}
      chapterProgress={chapterProgressPercentage ?? 0}
      previousUserChapterProgress={previousUserChapterComplete}
      prviousChapter={previousChapter}
    />
  );
}