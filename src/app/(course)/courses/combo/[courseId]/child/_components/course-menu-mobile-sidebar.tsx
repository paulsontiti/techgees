"use client";
import React, { useEffect, useState } from "react";
import CourseProgress from "@/components/course-progress";
import { Chapter, Session, UserProgress } from "@prisma/client";

import BackButton from "@/components/back-button";
import axios from "axios";
import { ChapterAndSessions } from "@/app/(course)/courses/components/chapter-sessions";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { PaidChapterType } from "../../../../../../../../actions/getPaidChapters";
import useIsPreviousChapterComplete from "../../../../../../../../hooks/useIsPreviousChapterComplete";
import useChapterprogressPercentage from "../../../../../../../../hooks/useChapterprogressPercentage";
//import { PaidChapterType } from "../../../../../../../../actions/getPaidChapters";

type CourseSidebarProps = {
  childId: string;
  parentId: string;
};

export type SidebarChapter = Chapter & {
  sessions: Session[];
  userProgresses: UserProgress[];
};

function CoursemenuMobileSidebar({ childId, parentId }: CourseSidebarProps) {
  const [progressPercentage, setProgressPercentage] = useState<
    number | undefined
  >(undefined);
  const [courseTitle, setCourseTitle] = useState<string | undefined>(undefined);
  const [chapters, setChapters] = useState<SidebarChapter[] | undefined>(
    undefined
  );


  useEffect(() => {
    (async () => {
      try {
        const titleRes = await axios.get(`/api/courses/${childId}/title`);
        setCourseTitle(titleRes.data);

        const res = await axios.get(
          `/api/courses/${childId}/progress-percentage`
        );
        setProgressPercentage(res.data);

        const chapRes = await axios.get(
          `/api/courses/${childId}/sidebar-chapters`
        );
        setChapters(chapRes.data);

       
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);

  return (
    <div className="h-screen mt-4 border-r flex flex-col overflow-y-auto shadow-sm bg-white">
      <div className="py-8 px-2 flex flex-col border-b gap-y-2">
        <BackButton label="main course" url={`/courses/combo/${parentId}`} />
        <div className="flex items-center justify-between">
          {courseTitle === undefined ? (
            <Skeleton className="w-full h-5 my-2" />
          ) : (
            <h1 className="font-semibold">{courseTitle}</h1>
          )}
        </div>

        <div className="mt-10">
          {progressPercentage === undefined ? (
            <Skeleton className="w-full h-5 my-2" />
          ) : (
            <CourseProgress variant="success" value={progressPercentage} />
          )}
        </div>
      </div>

      {chapters === undefined ? (
        <Skeleton className="w-11/12 h-[600px] m-2" />
      ) : (
        <Chapters chapters={chapters} parentId={parentId} childId={childId}/>
      )}
    </div>
  );
}

export default CoursemenuMobileSidebar;

export const Chapters = ({
  chapters,
  parentId,
  childId,
}: {
  chapters: SidebarChapter[];
  parentId: string;
  childId: string;
}) => {
  const [paidChapters, setPaidChapters] = useState<
    PaidChapterType[] | undefined
  >(undefined);
    const [numberOfFreeChapters, setNumberOfFreeChapters] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      try {
        const paidChapRes = await axios.get(
          `/api/courses/${parentId}/paid-chapters`
        );
        setPaidChapters(paidChapRes.data);

         const freeChapRes = await axios.get(
          `/api/courses/${childId}/number-of-free-chapters`
        );
        setNumberOfFreeChapters(freeChapRes.data);
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);
  if (paidChapters === undefined) return <Skeleton className="w-full h-10" />;
  //get number of paid chapters
  const chapter = paidChapters.find((chapter) => chapter.courseId === childId);
  const numberOfPaidChapters = chapter?.numberOfChapter ?? 0;
  const chaps = chapters
        ?.slice(
          0,
          numberOfPaidChapters === 0
            ? numberOfFreeChapters
            : numberOfPaidChapters
        )
  return (
    <>
      {
        chaps.map((chapter) => {
          const prevChapter = chaps[chapter.position - 1];
          return <MobileChapter parentId={parentId} chapter={chapter} key={chapter.id}
          prevChapter={prevChapter}/>
        }
        )}
    </>
  );
};
function MobileChapter({
  chapter,
  prevChapter,parentId
}: {
  chapter: SidebarChapter;
  prevChapter: Chapter;
  parentId:string
}) {
  const {IsPreviousChapterComplete} = useIsPreviousChapterComplete(chapter.courseId,chapter.id)

  const {chapterprogressPercentage} = useChapterprogressPercentage(chapter.courseId,chapter.id)

 

  return (
    <ChapterAndSessions
      chapter={chapter}
      key={chapter.id}
      previousChapter={prevChapter}
      previousUserChapterComplete={IsPreviousChapterComplete}
      chapterProgressPercentage={chapterprogressPercentage}
      parentId={parentId}
      paidFor={true}
    />
  );
}

// const Chapters = ({chapters,parentId}:{
//   chapters:SidebarChapter[],parentId:string
// })=>{

//    //get number of paid chapters
//    const chapter = paidChapters.find((chapter) => chapter.courseId === childId);
//    const numberOfPaidChapters = chapter?.numberOfChapter ?? 0;
//   return <>

//         {chapters?.slice(0, (numberOfPaidChapters === 0 ? numberOfFreeChapters : numberOfPaidChapters))
//         .map((chapter)=>(
//           <div key={chapter.id}></div>
//         // <ChapterAndSessions parentId={parentId} chapter={chapter} key={chapter.id}/>
//       ))}
//       </>
// }
