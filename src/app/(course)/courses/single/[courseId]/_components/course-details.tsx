"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";

import { OpenSheetButton } from "@/components/open-sheet";

function CourseDetails({
  course,
  scholarshipCourse,
}: {
  course: CourseChaptersUserProgressType;
  scholarshipCourse: boolean;
}) {

  
  return (
    <div
      className="
        flex flex-col max-w-4xl mx-auto pb-20"
    >
      <div className="p-4 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold mb-2">
          {course.title}
        </h2>
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
      <Separator />

    <OpenSheetButton label="Go to class"/>
    </div>
  );
}

export default CourseDetails;
