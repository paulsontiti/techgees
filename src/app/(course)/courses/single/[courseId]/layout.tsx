
import React from "react";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

 function CourseLayout({
  children,
  params: { courseId },
}: {
  children: React.ReactNode;
  params: { courseId: string }
}) {
  return (
    <div>
      <div>
        <CourseNavbar
          courseId={courseId}
        />
      </div>
      <div className="flex mt-10 justify-center">
      <div className="hidden h-full  md:flex w-1/3 flex-col inset-y-0 z-50">
        <CourseSidebar
         courseId={courseId}
        
        />
      </div>
      <div className="px-4 md:w-2/3">
        {children}
        </div>
      </div>
    </div>
  );
}

export default CourseLayout;
