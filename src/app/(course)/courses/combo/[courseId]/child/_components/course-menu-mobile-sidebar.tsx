"use client"
import React, { useEffect, useState } from "react";
import CourseProgress from "@/components/course-progress";
import { Chapter, Course, Session, UserProgress } from "@prisma/client";

import BackButton from "@/components/back-button";
import { ChapterAccordion } from "./chapter-accordion";
import axios from "axios";

type CourseSidebarProps = {
  course: Course;
  parentId: string,
  chapters: SidebarChapter[],
  progressPercentage: number;
};

export type SidebarChapter = Chapter & {
  sessions: Session[],
  userProgresses: UserProgress[]

}

  function CoursemenuMobileSidebar({
  course, chapters,
  progressPercentage, parentId
}: CourseSidebarProps) {

  return (
    <div className="h-[70vh] mt-4 border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="py-8 px-2 flex flex-col border-b gap-y-2">
        <BackButton label="main course"
          url={`/courses/combo/${parentId}`} />
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">{course.title}</h1>

        </div>

        <div className="mt-10">
          <CourseProgress variant="success" value={progressPercentage} />

        </div>
      </div>
      {chapters.map((chapter)=>(
        <ChapterAndSessions parentId={parentId} chapter={chapter} key={chapter.id}/>
      ))}
    </div>
  );
}

export default CoursemenuMobileSidebar;

const ChapterAndSessions = ({chapter,parentId}:{chapter:SidebarChapter,parentId:string})=>{
     const [chapterProgressPercentage,setChapterProgressPercentage] = useState<any>(undefined);
     const [previousChapter,setPreviousChapter] = useState<any>(undefined);
     const [previousUserChapterProgress,setPreviousUserChapterProgress] = useState<any>(undefined);

            //get chapter progress percentage
          useEffect(()=>{
            (
                async()=>{
                    const res = await axios.get(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/progress`);
                    setChapterProgressPercentage(res.data);
                }
            )()
          },[])

             //get previous chapter
             useEffect(()=>{
                (
                    async()=>{
                        const res = await axios.get(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/previous-chapter`);
                        setPreviousChapter(res.data);
                      
                    }
                )()
              },[])

               //get previous chapter progress
             useEffect(()=>{
                (
                    async()=>{
                        const res = await axios.get(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/previous-chapter-progress`);
                        setPreviousUserChapterProgress(res.data);
                    }
                )()
              },[])

  
       return (
        <ChapterAccordion
          key={chapter.id}
          id={chapter.id}
          title={chapter.title}
          isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
          courseId={chapter.courseId}
          parentId={parentId}
          isLocked={
            (previousChapter && !previousUserChapterProgress?.isCompleted) ||
            !chapter.isPublished
          }
          sessions={chapter.sessions ?? []}
          chapterProgress={chapterProgressPercentage ?? 0}
          previousUserChapterProgress={previousUserChapterProgress}
          prviousChapter={previousChapter}
        />
      );
}