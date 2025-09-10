"use client";

import { cn } from "@/lib/utils";
import { CheckCheck, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SessionSidebarItem from "./session-sidebar-item";
import CourseProgress from "@/components/course-progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chapter, Session, UserProgress } from "@prisma/client";
import Banner from "@/components/banner";
import { useSheetStore } from "../../../../../../../store/sheet-store";

type CourseSidebarItemProps = {
  title: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  sessions: Session[];
  chapterProgress: number,
  previousUserChapterProgress: UserProgress | null,
  prviousChapter: Chapter | null
};

export function ChapterAccordion({
  id,
  title,
  isCompleted,
  isLocked,
  courseId,
  sessions, chapterProgress, previousUserChapterProgress, prviousChapter
}: CourseSidebarItemProps) {

  const pathname = usePathname();
  const router = useRouter();
  const {closeSheet} = useSheetStore();

  const Icon = isLocked ? Lock : isCompleted ? CheckCheck : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    closeSheet();
    router.push(`/courses/single/${courseId}/chapters/${id}`);
  };

  return (
    <Accordion type="single" collapsible className="w-full px-2">
      <AccordionItem value="item-1">

        <AccordionTrigger onClick={(e)=>{e.stopPropagation()}}>

          <button
            onClick={onClick}
            type="button"
            className={cn(
              "w-10/12 h-[50px] p-4 flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-sky-300/20",
              isActive &&
              "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
              isCompleted && isActive && "bg-emerald-200/20"
            )}
          >
            <div className="flex items-center gap-x-2 py-4">
              <Icon
                size={22}
                className={cn(
                  "text-slate-500",
                  isActive && "text-slate-700",
                  isCompleted && "text-emerald-700"
                )}
              />
              <span className="line-clamp-1">{title}</span>

            </div>
            <div className={cn(
              "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
              isActive && "opacity-100",
              isCompleted && "border-emerald-700"
            )}>

            </div>
          </button>

        </AccordionTrigger>
        <AccordionContent className="ml-16">
          <div>
            <div className="w-full flex flex-col gap-y-2">
              <>{prviousChapter?.title}</>
              {prviousChapter && !previousUserChapterProgress && 
              <Banner label="Previous chapter is not completed " />}
              <CourseProgress value={chapterProgress} variant="success" />
            </div>
            {sessions.map((session) => {
              return (
                <SessionSidebarItem key={session.id}
                  title={session.title}
                  chapterId={session.chapterId}
                  courseId={courseId}
                  id={session.id}
                  sessionId={session.id}
                  isLocked={isLocked || !session.isPublished}

                />
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
