"use client"
import { useEffect, useState } from "react";
import { SidebarChapter } from "../combo/[courseId]/child/_components/course-sidebar";
import axios from "axios";
import { ChapterAccordion } from "../combo/[courseId]/child/_components/chapter-accordion";
import toast from "react-hot-toast";

export const ChapterAndSessions = ({ chapter, parentId, paidPositions }: { chapter: SidebarChapter, parentId?: string, paidPositions?: number[] }) => {
  const [chapterProgressPercentage, setChapterProgressPercentage] = useState<any>(undefined);
  const [previousChapter, setPreviousChapter] = useState<any>(undefined);
  const [previousUserChapterProgress, setPreviousUserChapterProgress] = useState<any>(undefined);

  //get chapter progress percentage
  useEffect(() => {
    (
      async () => {
        try {
          const res = await axios.get(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/progress`);
          setChapterProgressPercentage(res.data);
          //get previous chapter
          const prvChapterRes = await axios.get(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/previous-chapter`);
          setPreviousChapter(prvChapterRes.data);

          //get previous chapter progress
          const prvChapUserProgressRes = await axios.get(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/previous-chapter-progress`);
          setPreviousUserChapterProgress(prvChapUserProgressRes.data);
        } catch (err: any) {
          toast.error(err.message);
        }
      }
    )()
  }, [])

  const chapterPaidFor = paidPositions?.indexOf(chapter.position);


  return (
    <ChapterAccordion
      key={chapter.id}
      id={chapter.id}
      title={chapter.title}
      isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
      courseId={chapter.courseId}
      parentId={parentId || ""}

      isLocked={
        //if there is parent id we don't need to lock the chapter because 
        // combo course deosn't need chapterpaidfor to render chapters
        parentId ?
          ((previousChapter && !previousUserChapterProgress?.isCompleted) ||
            !chapter.isPublished) :
          (
            (previousChapter && !previousUserChapterProgress?.isCompleted) ||
            ((!chapter.isPublished || !chapter.isFree)
              && chapterPaidFor && chapterPaidFor < 0)
          )
      }
      sessions={chapter.sessions ?? []}
      chapterProgress={chapterProgressPercentage ?? 0}
      previousUserChapterProgress={previousUserChapterProgress}
      prviousChapter={previousChapter}
    />
  );
}