
import React from "react";
import CourseNavbar from "../_components/course-navbar";
import CourseSidebar from "../_components/course-sidebar";

function ChildCourseLayout({
  children,
  params: { courseId: parentId, childId }
}: {
  children: React.ReactNode;
  params: { courseId: string, childId: string },

}) {
  
  return (
    <div className="h-full">
      <div>
        <CourseNavbar
          parentId={parentId}
          childId={childId}
        />
      </div>
      <div className="flex mt-10 justify-center">
        <div className="hidden max-h-[100vh]  md:flex w-1/3 xl:w-3/12 flex-col inset-y-0 z-50">
          <CourseSidebar
              parentId={parentId}
              childId={childId}
          />
        </div>
        <div className="px-4 md:w-2/3 xl:w-9/12">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ChildCourseLayout;
