"use client"
import { Chapter } from "@prisma/client";
import { SidebarChapter } from "./course-menu-mobile-sidebar";
import { ChapterAccordion } from "./chapter-accordion";

type ChapterAndSessionsParamType ={
chapter: SidebarChapter, parentId?: string,
chapterProgressPercentage:number,
previousChapter:Chapter,
previousUserChapterComplete:boolean,

}

export const ChapterAndSessions = ({ chapter, parentId,
  chapterProgressPercentage,previousChapter,previousUserChapterComplete
}: ChapterAndSessionsParamType) => {


  return (
    <ChapterAccordion
      key={chapter.id}
      id={chapter.id}
      title={chapter.title}
      isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
      courseId={chapter.courseId}
      parentId={parentId || ""}

      isLocked={    
          ((previousChapter && !previousUserChapterComplete) ||
            !chapter.isPublished) 
      }
      sessions={chapter.sessions ?? []}
      chapterProgress={chapterProgressPercentage ?? 0}
      previousUserChapterProgress={previousUserChapterComplete}
      prviousChapter={previousChapter}
    />
  );
}