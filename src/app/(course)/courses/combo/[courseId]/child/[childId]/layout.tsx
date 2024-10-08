import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ErrorPage from "@/components/error";
import CourseNavbar from "../_components/course-navbar";
import CourseSidebar from "../_components/course-sidebar";
import { getCourseChaptersUserProgress } from "../../../../../../../../actions/getCourseChaptersUserProgress";
import { getCourseProgress } from "../../../../../../../../actions/getCourseProgress";
import { getPaidChapters } from "../../../../../../../../actions/getPaidChapters";
import { getPurchasePercentage } from "../../../../../../../../actions/getPurchasePercentage";
import { getCourseNumberOfFreeChapters } from "../../../../../../../../actions/getCourseNumberOfFreeChapters";
async function ChildCourseLayout({
  children,
  params: { courseId: parentId, childId }
}: {
  children: React.ReactNode;
  params: { courseId: string, childId: string },

}) {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  //get the child course
  const { course: childCourse, error: courseError } = await getCourseChaptersUserProgress(
    userId,
    childId
  );

  if (courseError) return <ErrorPage name={courseError.name} />;
  if (!childCourse) return redirect("/");

  const { progressPercentage, error } = await getCourseProgress(
    userId,
    childId
  );
  if (error) return <ErrorPage name={error.name} />;

  const { purchasePercentage, error: purchaseError } = await getPurchasePercentage(parentId, userId)
  if (purchaseError) return <ErrorPage name={purchaseError.name} />;


  const { paidChapters, error: chapterError } = await getPaidChapters(parentId, purchasePercentage)
  if (chapterError) return <ErrorPage name={chapterError.name} />;

  //get course chapter paid for
  const chapter = paidChapters.find((chapter) => chapter.courseId === childCourse.id);
  const numberOfPaidChapters = chapter?.numberOfChapter ?? 0;

  //get number of free chapters
  const { numberOfFreeChapters, error: freeChapError } = await getCourseNumberOfFreeChapters(childId)
  if (freeChapError) return <ErrorPage name={freeChapError.name} />;


  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-[320px] 2xl:pl-[400px] fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={childCourse}
          parentId={parentId}
          progressPercentage={progressPercentage ?? 0}
        />
      </div>
      <div className="hidden md:flex h-full w-[300px] 2xl:w-[400px] flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={childCourse}
          parentId={parentId}
          progressPercentage={progressPercentage ?? 0}
          chapters={childCourse.chapters.slice(0, (numberOfPaidChapters === 0 ? numberOfFreeChapters : numberOfPaidChapters))}
        />
      </div>
      <main className="md:pl-[320px] 2xl:pl-[400px] h-full pt-[80px]">
        {children}</main>
    </div>
  );
}

export default ChildCourseLayout;
