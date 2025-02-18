"use client"

import React, { useEffect, useState } from "react";
import CourseProgress from "@/components/course-progress";
import { Chapter,Session, UserProgress } from "@prisma/client";

import BackButton from "@/components/back-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Chapters } from "./course-menu-mobile-sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { PaidChapterType } from "../../../../../../../../actions/getPaidChapters";

type CourseSidebarProps = {
  childId: string;
  parentId: string,
  
  
};

export type SidebarChapter = Chapter & {
  sessions: Session[],
  userProgresses: UserProgress[]

}

 function CourseSidebar({
  childId,  parentId
}: CourseSidebarProps) {
  const [progressPercentage,setProgressPercentage] = useState<number | undefined>(undefined);
  const [courseTitle,setCourseTitle] = useState<string | undefined>(undefined);
  const [chapters,setChapters] = useState<SidebarChapter[] | undefined>(undefined);
   const [numberOfFreeChapters,setNumberOfFreeChapters] = useState<number | undefined>(undefined);
     const [paidChapters,setPaidChapters] = useState<PaidChapterType[] | undefined>(undefined);

  useEffect(()=>{
    (
      async()=>{
        try{
          const titleRes = await axios.get(`/api/courses/${childId}/title`);
          setCourseTitle(titleRes.data);

          const res = await axios.get(`/api/courses/${childId}/progress-percentage`);
          setProgressPercentage(res.data);

          const chapRes = await axios.get(`/api/courses/${childId}/sidebar-chapters`);
          setChapters(chapRes.data);

          const paidChapRes = await axios.get(`/api/courses/${parentId}/paid-chapters`);
          setPaidChapters(paidChapRes.data);

          const freeChapRes = await axios.get(`/api/courses/${childId}/number-of-free-chapters`);
          setNumberOfFreeChapters(freeChapRes.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
  },[]);

  return (
    <div className="h-screen mt-4 border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="py-8 px-2 flex flex-col border-b gap-y-2">
        <BackButton label="main course"
          url={`/courses/combo/${parentId}`} />
        <div className="flex items-center justify-between">
        {courseTitle === undefined ? <Skeleton className="w-full h-5 my-2"/> :  
                <h1 className="font-semibold">{courseTitle}</h1>}
       

        </div>

        <div className="mt-10">
         {progressPercentage === undefined ? <Skeleton className="w-full h-5 my-2"/> :  
         <CourseProgress variant="success" value={progressPercentage} />}

        </div>
      </div>
      {paidChapters === undefined || chapters === undefined || numberOfFreeChapters === undefined
       ? <Skeleton className="w-11/12 h-[600px] m-2"/>: <Chapters
        chapters={chapters} paidChapters={paidChapters} childId={childId} parentId={parentId}
        numberOfFreeChapters={numberOfFreeChapters}
      />}
    </div>
  );
}

export default CourseSidebar;
