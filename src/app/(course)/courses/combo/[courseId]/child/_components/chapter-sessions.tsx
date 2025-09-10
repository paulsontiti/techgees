
import { SidebarChapter } from "./course-sidebar";
import { ChapterAccordion } from "./chapter-accordion";
import { Chapter, UserProgress } from "@prisma/client";

type ChapterAndSessionsParamType ={
chapter: SidebarChapter, parentId?: string,
  previousUserChapterComplete: UserProgress | null,
  previousChapter: Chapter | null,
  
 chapterProgress: number,
}

export const ChapterAndSessions = ({ chapter, parentId,previousUserChapterComplete,previousChapter,
  chapterProgress
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
       !chapter.isFree ||
          ((previousChapter && !previousUserChapterComplete) ||
            !chapter.isPublished) 
      }
      sessions={chapter.sessions ?? []}
      chapterProgress={chapterProgress ?? 0}
      previousUserChapterProgress={previousUserChapterComplete?.isCompleted || false}
      prviousChapter={previousChapter}
    />
  );
}