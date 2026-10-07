"use client"
import { Reveal } from "@/app/(kids)/components/landing-page";
import React, { useEffect, useState } from "react";
import { CheckCheck, Lock, LucideIcon, PlayCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { SidebarChapter } from "@/app/(course)/courses/combo/[courseId]/child/_components/course-sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import CourseProgress from "./course-progress";
import { Skeleton } from "./ui/skeleton";

type CourseSidebarItemProps = {
  chapter: SidebarChapter;
  isCompleted: boolean;
  isLocked: boolean;
  parentId: string;
};

function ChapterCard({
  chapter,
  isCompleted,
  isLocked,
  parentId,
}: CourseSidebarItemProps) {
  const [previousUserChapterProgress, setPreviousUserChapterProgress] =
    useState<boolean | null | undefined>(undefined);
  const [chapterProgress, setChapterProgress] = useState<number | undefined>(
    undefined,
  );
  const [prviousChapter, setPrviousChapter] = useState<
    { id: string } | undefined
  >(undefined);

  const [lockChapter, setLockChapter] = useState<undefined | boolean>(
    undefined,
  );

  const pathname = usePathname();
  const router = useRouter();

  const [Icon, setIcon] = useState<LucideIcon>(
    isLocked ? Lock : isCompleted ? CheckCheck : PlayCircle,
  );

  const [iconLock, setIconLock] = useState(true);

  const chapterUrl = parentId
    ? `/courses/combo/${parentId}/child/${chapter.courseId}/chapters/${chapter.id}`
    : `/courses/single/${chapter.courseId}/chapters/${chapter.id}`;

  const previousChapterAssignmentUrl = parentId
    ? `/courses/combo/${parentId}/child/${chapter.courseId}/chapters/${prviousChapter?.id}/#chapter-assignment`
    : `/courses/single/${chapter.courseId}/chapters/${prviousChapter?.id}/#chapter-assignment`;

  const fetchAccordionData = async () => {
    try {
      const res = await axios.get(
        `/api/courses/${chapter.courseId}/chapters/${chapter.id}/accordion-data`,
      );
      setChapterProgress(res.data.chapterProgress);
      setPreviousUserChapterProgress(res.data.previousUserChapterProgress);
      setPrviousChapter(res.data.previousChapter);

      const lockChapter =
        (res.data.previousChapter &&
          !res.data.previousUserChapterProgress?.isCompleted) ||
        isLocked;

      const icon = lockChapter ? Lock : isCompleted ? CheckCheck : PlayCircle;
      setIconLock(lockChapter);
      setLockChapter(lockChapter);
      setIcon(icon);
    } catch (error: any) {
      toast.error("Error occured while fetching data");
    }
  };

  useEffect(() => {
    fetchAccordionData();
  }, []);

  return (
    // <Reveal delay={index * 0.03}>
    //                 <Link href={url}
    //                   className="relative hover:cursor-pointer group h-full rounded-3xl border border-white/10 bg-white/[.06] p-5 transition hover:-translate-y-1 hover:bg-white/[.1]"
    //                 >
    //                   <div className="flex items-center justify-between">
    //                     <span className="text-xs font-black text-[#ffd429]">
    //                       PHASE {index+1}
    //                     </span>
    //                     {/* <span className="text-2xl">{phase.emoji}</span> */}
    //                   </div>
    //                   <h3 className="mt-4 font-black">{title}</h3>
    //                   <h5 className="mt-2 text-xs">{sessions} classes</h5>
    //                   <p className="mt-2 text-sm leading-6 text-slate-400">
    //                     <Preview value={desc}/>
    //                   </p>
    //                   {/* <div className="mt-5 mb-4 border-t border-white/10 pt-4 text-xs font-bold text-slate-300">
    //                     {}
    //                   </div> */}
    //                   <span className="absolute bottom-2 right-4  text-[#ffd429]">Explore →</span>
    //                 </Link>
    //               </Reveal>
    <Reveal delay={chapter.position * 0.03}>
      <div
        onClick={() => {
          if (lockChapter) {
            toast.error(
              "You cannot access this chapter. Previous chapter have not been completed",
            );
          } else {
            router.push(chapterUrl);
          }
        }}
        className={`relative ${lockChapter ? "hover:cursor-not-allowed" : "hover:cursor-pointer"} group h-full rounded-3xl border border-white/10 bg-white/[.06] p-5 transition hover:-translate-y-1 hover:bg-white/[.1]`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-[#ffd429]">
            Chapter {chapter.position + 1}
          </span>
          <span className="text-2xl">{}</span>
        </div>
        <h3 className="mt-4 font-black mb-4">{chapter.title}</h3>
        {/* <h5 className="mt-2 text-xs">{phase.subtitle}</h5>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          <Preview
            value={chapter.description ? chapter.description.slice(0, 100) : ""}
          />
        </p> */}
        {/* <div className="mt-5 mb-4 border-t border-white/10 pt-4 text-xs font-bold text-slate-300">
                                {phase.promise}
                              </div> */}
       <>
       {isCompleted &&  <span className="absolute bottom-2 right-4  text-[#ffd429]">Completed</span>}
       </>
        <>
       {!lockChapter &&  <span className="absolute bottom-2 right-4  text-[#ffd429]">Explore →</span>}
       </>
       

        <div className="my-4">
          {chapterProgress !== undefined ? (
            <>
              {!lockChapter && (
                <CourseProgress value={chapterProgress} variant="success" />
              )}
            </>
          ) : (
            <Skeleton className="w-full h-10" />
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default ChapterCard;
