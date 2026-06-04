"use client"
import { Chapter } from "@prisma/client";
import { ChapterAccordion } from "./chapter-accordion";
import { SidebarChapter } from "./course-sidebar";

type ChapterAndSessionsParamType ={
chapter: SidebarChapter, parentId?: string,
previousChapter:SidebarChapter,
previousUserChapterComplete:boolean,

}

export const ChapterAndSessions = ({ chapter, parentId,
  previousChapter,previousUserChapterComplete
}: ChapterAndSessionsParamType) => {


  return (
    <ChapterAccordion
      key={chapter.id}
      title={chapter.title}
      isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
      courseId={chapter.courseId}
      chapterId={chapter.id}
      parentId={parentId || ""}

      isLocked={    
          ((previousChapter && !previousUserChapterComplete) ||
            !chapter.isPublished) 
      }
      // sessions={chapter.sessions ?? []}
      //chapterProgress={chapterProgressPercentage ?? 0}
      // previousUserChapterProgress={previousUserChapterComplete}
      // prviousChapter={previousChapter}
    />
  );
}