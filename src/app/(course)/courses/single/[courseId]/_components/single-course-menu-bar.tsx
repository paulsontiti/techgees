"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSheetStore } from "../../../../../../../store/sheet-store";
import SingleCourseMobileSidebar from "./single-course-mobile-sidebar";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";

function SingleCourseMenuBar({
  course,
  progressPercentage,
}: {
  course: CourseChaptersUserProgressType;
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
        <SingleCourseMobileSidebar
          course={course}
          progressPercentage={progressPercentage}
        />
      </SheetContent>
    </Sheet>
  );
}

export default SingleCourseMenuBar;
