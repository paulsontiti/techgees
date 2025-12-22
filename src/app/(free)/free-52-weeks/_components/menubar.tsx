"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import WeeksAside from "./weeks";
import { SidebarChapter } from "@/app/(course)/courses/combo/[courseId]/child/_components/course-sidebar";
import { useSheetStore } from "../../../../../store/sheet-store";

function WeekMenuBar({
  chapter,
  progressPercentage,
}: {
  chapter: SidebarChapter;
  progressPercentage: number;
}) {
  const { openSheet, closeSheet, isOpen } = useSheetStore();
  return (
    <Sheet open={isOpen}>
      <SheetTrigger
        className="
md:hidden pr-4 hover:opacity-75 transition"
      >
        <Menu onClick={openSheet} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="
p-0 bg-white w-11/12"
        onClick={closeSheet}
        onInteractOutside={closeSheet}
      >
      <WeeksAside progressPercentage={progressPercentage} chapter={chapter}/>
      </SheetContent>
    </Sheet>
  );
}

export default WeekMenuBar;
