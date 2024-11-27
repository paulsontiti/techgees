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
      <div>
        <CourseNavbar
          course={childCourse}
          parentId={parentId}
          progressPercentage={progressPercentage ?? 0}
          chapters={childCourse.chapters.slice(0, (numberOfPaidChapters === 0 ? numberOfFreeChapters : numberOfPaidChapters))}
        />
      </div>
      <div className="flex mt-10 justify-center">
      <div className="hidden max-h-[100vh]  md:flex w-1/3 flex-col inset-y-0 z-50">
        <CourseSidebar
          course={childCourse}
          parentId={parentId}
          progressPercentage={progressPercentage ?? 0}
          chapters={childCourse.chapters.slice(0, (numberOfPaidChapters === 0 ? numberOfFreeChapters : numberOfPaidChapters))}
        />
      </div>
      <div className="px-4 md:w-2/3">
        {children}
        </div>
      </div>
    </div>
  );
}

export default ChildCourseLayout;
