"use client";
import React, { useState } from "react";

import PageLoader from "@/components/page-loader";

import EditPencil from "@/components/edit-pencil";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import OtherChapter from "./other-chapter";

interface SessionOtherChapterListProps {
  otherChapters: {chapterId:string,sessionPosition:number}[];
  onEdit: (chapterId: string) => void;
  courseId:string,
  sessionChapterId:string,
  sessionId:string
}

function SessionOtherChapterList({
  onEdit,
  otherChapters,
  
  courseId,
  sessionChapterId,
  sessionId
}: SessionOtherChapterListProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);


  return (
    <div className="relative">
      <PageLoader isloading={isRedirecting} label="redirecting...." />

      {otherChapters.map((otherChapter) => {
        return (
          <div
            className="ml-auto pr-2 flex items-center justify-between bg-white p-2 my-2"
            key={otherChapter.chapterId}
          >
            <OtherChapter 
            courseId={courseId}
            sessionChapterId={sessionChapterId}
            sessionId={sessionId}
            otherChapter={otherChapter}
            />           
          </div>
        );
      })}
    </div>
  );
}

export default SessionOtherChapterList;
