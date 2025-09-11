"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSheetStore } from "../../../../../../../store/sheet-store";
import SingleCourseMobileSidebar from "./single-course-mobile-sidebar";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";
import { Scholarship } from "@prisma/client";

function SingleCourseMenuBar({
  course,
  progressPercentage,
  scholarship
}: {
  course: CourseChaptersUserProgressType;
  scholarship: Scholarship | null;
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
          scholarship={scholarship}
          progressPercentage={progressPercentage}
        />
      </SheetContent>
    </Sheet>
  );
}

export default SingleCourseMenuBar;
