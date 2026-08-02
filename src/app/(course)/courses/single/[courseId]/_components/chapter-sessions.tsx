"use client";
import { SidebarChapter } from "../../../combo/[courseId]/child/_components/course-sidebar";
import { ChapterAccordion } from "../../../combo/[courseId]/child/_components/chapter-accordion";

type ChapterAndSessionsParamType = {
  chapter: SidebarChapter;
  parentId?: string;
  courseId: string;
  paidFor:boolean
};

export const ChapterAndSessions = ({
  chapter,
  parentId,
  courseId,
  paidFor
}: ChapterAndSessionsParamType) => {
 

 

  return (
    <ChapterAccordion
      key={chapter.id}
      chapterId={chapter.id}
      title={chapter.title}
      isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
      courseId={courseId}
      parentId={parentId || ""}
      isLocked={(!chapter.isFree && !paidFor) || !chapter.isPublished}
    />
  );
};
