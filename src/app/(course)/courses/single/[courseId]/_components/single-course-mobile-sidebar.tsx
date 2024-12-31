"use client"
import React, { useEffect, useState } from "react";
import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { ChapterAccordion } from "./chapter-accordion";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";
import Heading from "@/components/heading";
import axios from "axios";
import { SidebarChapter } from "../../../combo/[courseId]/child/_components/course-sidebar";

export type CourseSidebarProps = {
  course: CourseChaptersUserProgressType;
  progressPercentage: number;
  purchasePercentage: number;
  paidPositions:number[],
  hasLiked:boolean,
  hasDisLiked:boolean,
  hasRated:boolean
};

 function SingleCourseMobileSidebar({
  course,paidPositions,progressPercentage,purchasePercentage,hasDisLiked,hasLiked,hasRated
}: CourseSidebarProps) {
  



  return (
    <div className="h-full bg-white mt-4 px-4 border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="py-8 px-2 flex flex-col border-b">
        <div className="flex items-center justify-between">
          <Heading type={1} text={course.title} className="font-semibold"/>
          
          <CourseActioDropdownMenu
            courseId={course.id}
            hasDisLiked={hasDisLiked}
            hasLiked={hasLiked}
            hasRated={hasRated}
          />
        </div>
        {!course.isFree && <PaymentProgress value={purchasePercentage} size="sm" amountPaid={(purchasePercentage / 100) * course.price!} />}
        <div className="mt-10">
          <CourseProgress variant="success" value={progressPercentage ?? 0} />

        </div>
      </div>
    {course.chapters.map((chapter)=>(
        <ChapterAndsessions chapter={chapter} paidPositions={paidPositions} key={chapter.id}/>
    ))}
    </div>
  );
}

export default SingleCourseMobileSidebar;

const ChapterAndsessions = ({chapter,paidPositions}:{chapter:SidebarChapter, paidPositions:number[]})=>{

    
      
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
                          const res = await axios.get(`/api/courses/${chapter.courseId}}/chapters/${chapter.id}/previous-chapter`);
                          setPreviousChapter(res.data);
                        
                      }
                  )()
                },[])
  
                 //get previous chapter progress
               useEffect(()=>{
                  (
                      async()=>{
                          const res = await axios.get(`/api/courses/${chapter.courseId}}/chapters/${chapter.id}/previous-chapter-progress`);
                          setPreviousUserChapterProgress(res.data);
                      }
                  )()
                },[])

          const chapterPaidFor = paidPositions.indexOf(chapter.position);

          return (
            <ChapterAccordion
              key={chapter.id}
              id={chapter.id}
              title={chapter.title}
              isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
              courseId={chapter.courseId}
              isLocked={
                (previousChapter && !previousUserChapterProgress?.isCompleted) ||
                ((!chapter.isPublished || !chapter.isFree)
                  && chapterPaidFor < 0)
              }
              sessions={chapter.sessions ?? []}
              chapterProgress={chapterProgressPercentage ?? 0}
              previousUserChapterProgress={previousUserChapterProgress}
              prviousChapter={previousChapter}
            />
          );
       
}