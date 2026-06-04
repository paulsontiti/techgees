"use client";

import { cn } from "@/lib/utils";
import { CheckCheck, Lock, LucideIcon, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import SessionSidebarItem from "./session-sidebar-item";
import CourseProgress from "@/components/course-progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSheetStore } from "../../../../../../../../store/sheet-store";
import { Skeleton } from "@/components/ui/skeleton";
import CompletedPreviousChapterTest from "@/app/(course)/courses/components/completed-previous-chapter";
import { OtherSession } from "@/app/(auth)/teacher/courses/[courseId]/chapters/[chapterId]/_components/sessions-list";
import toast from "react-hot-toast";
import axios from "axios";

type CourseSidebarItemProps = {
  title: string;
  chapterId: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  parentId: string;
};

export function ChapterAccordion({
  chapterId,
  title,
  isCompleted,
  isLocked,
  courseId,
  parentId,
}: CourseSidebarItemProps) {
  const [previousUserChapterProgress, setPreviousUserChapterProgress] =
    useState<{ isCompleted: boolean } | null | undefined>(undefined);
  const [chapterProgress, setChapterProgress] = useState<number | undefined>(
    undefined,
  );
  const [prviousChapter, setPrviousChapter] = useState<
    { id: string } | undefined
  >(undefined);
  const [sessions, setSessions] = useState<OtherSession[]>([]);

  const pathname = usePathname();
  const router = useRouter();
  const { closeSheet } = useSheetStore();

  const [Icon, setIcon] = useState<LucideIcon>(
    isLocked ? Lock : isCompleted ? CheckCheck : PlayCircle,
  );
  const isActive = pathname?.includes(chapterId);
  const [iconLock, setIconLock] = useState(true);

  const chapterUrl = parentId
    ? `/courses/combo/${parentId}/child/${courseId}/chapters/${chapterId}`
    : `/courses/single/${courseId}/chapters/${chapterId}`;

  const previousChapterAssignmentUrl = parentId
    ? `/courses/combo/${parentId}/child/${courseId}/chapters/${prviousChapter?.id}/#chapter-assignment`
    : `/courses/single/${courseId}/chapters/${prviousChapter?.id}/#chapter-assignment`;

  const onClick = () => {
    closeSheet();
    router.push(chapterUrl);
  };

  const fetchAccordionData = async () => {
    try {
      const res = await axios.get(
        `/api/courses/${courseId}/chapters/${chapterId}/accordion-data`,
      );
      setChapterProgress(res.data.chapterProgress);
      setPreviousUserChapterProgress(res.data.previousUserChapterProgress);
      setPrviousChapter(res.data.previousChapter);
      setSessions(res.data.sessions);

      setIconLock((res.data.previousChapter &&
          !res.data.previousUserChapterProgress?.isCompleted) || isLocked)

      const icon = iconLock ? Lock : isCompleted ? CheckCheck : PlayCircle;

      setIcon(icon);
    } catch (error: any) {
      toast.error("Error occured while fetching data");
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full px-2">
      <AccordionItem value="item-1">
        <AccordionTrigger
          onClick={async (e: any) => {
            e.stopPropagation();
            //fetch data only once, only the first click
            if (prviousChapter === undefined) {
              await fetchAccordionData();
            }
          }}
        >
          <button
            onClick={onClick}
            type="button"
            className={cn(
              "w-10/12 h-[50px] p-4 flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-sky-300/20",
              isActive &&
                "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
              isCompleted && isActive && "bg-emerald-200/20",
            )}
          >
            <div className="flex items-center gap-x-2 py-4">
              <Icon
                size={22}
                className={cn(
                  "text-slate-500",
                  isActive && "text-slate-700",
                  isCompleted && "text-emerald-700",
                )}
              />
              <span className="line-clamp-1">{title}</span>
            </div>
            <div
              className={cn(
                "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
                isActive && "opacity-100",
                isCompleted && "border-emerald-700",
              )}
            ></div>
          </button>
        </AccordionTrigger>
        <AccordionContent className="ml-16">
          <div>
            <div className="w-full flex flex-col gap-y-2">
              <>
                {previousUserChapterProgress === undefined ? (
                  <Skeleton className="w-full h-20" />
                ) : (
                  <>
                    {prviousChapter && !previousUserChapterProgress && (
                      <CompletedPreviousChapterTest
                        previousChapterAssignmentUrl={
                          previousChapterAssignmentUrl
                        }
                      />
                    )}
                  </>
                )}
              </>
              {chapterProgress !== undefined ? (
                <CourseProgress value={chapterProgress} variant="success" />
              ) : (
                <Skeleton className="w-full h-10" />
              )}
            </div>
            {Array.isArray(sessions) &&
              sessions.map((session) => {
                return (
                  <SessionSidebarItem
                    key={session.id}
                    title={session.title}
                    chapterId={session.chapterId}
                    courseId={courseId}
                    id={session.id}
                    parentId={parentId}
                    sessionId={session.id}
                    isLocked={iconLock || !session.isPublished}
                  />
                );
              })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
