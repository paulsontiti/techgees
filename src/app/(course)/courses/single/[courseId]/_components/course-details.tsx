"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";

import ChapterCard from "@/components/chapter-card";

function CourseDetails({ course }: { course: CourseChaptersUserProgressType }) {
  return (
   
    <div
      className="
        flex flex-col max-w-4xl mx-auto pb-20"
    >
      <div className="p-4 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
        {/* <SingleChapterEnrollButton
          showButton={showEnrollButton}
          courseId={courseId}
          chapterId={chapterId}
        /> */}
      </div>
      <Separator />
      <div>
        <Preview value={course.description || ""} />
      </div>
      {/* <ChapterSessionDetails
        sessionLength={chapterDetails.chapter?.sessions.length || 0}
        duration={duration}
      />

      <ChapterComments chapterId={chapterId} /> */}

      <Separator />
      
        {/* <div className="mx-auto max-w-7xl px-5 lg:px-8">
             <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                       
                         {course.chapters.map((chapter, index) => (
              <ChapterCard
              isLocked={(!chapter.isFree && !paidFor) || !chapter.isPublished}
               chapter={chapter} isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
              />
            ))}
                      </div>
           
        
        </div> */}
     

      {/* {completedLastSession === undefined ? (
        <Skeleton className="w-full h-10" />
      ) : (
        <>
          {completedLastSession &&
            chapterDetails.userProgress === null &&
            randonQuestions.length > 0 && (
              <ChapterTest
                questions={randonQuestions}
                chapterId={chapterDetails.chapter?.id || ""}
                chapterUrl={`/courses/single/${courseId}/chapters/${chapterId}`}
              />
            )}
        </>
      )} */}

      
    </div>
    
  );
}

export default CourseDetails;
