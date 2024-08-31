import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { getCourseProgress } from "../../../../../actions/getCourseProgress";
import CourseSidebar from "./_components/course-sidebar";
import ErrorPage from "@/components/error";
import { getCourseChaptersUserProgress } from "../../../../../actions/getCourseChaptersUserProgress";
import CourseNavbar from "./_components/course-navbar";
import { getPurchasePercentage } from "../../../../../actions/getPurchasePercentage";

async function CourseLayout({
  children,
  params: { courseId },
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { course, error: courseError } = await getCourseChaptersUserProgress(
    userId,
    courseId
  );
  
  if (courseError) return <ErrorPage message={courseError.message} />;
  if (!course) return redirect("/");

  const { progressPercentage, error } = await getCourseProgress(
    userId,
    courseId
  );
  if (error) return <ErrorPage message={error.message} />;

 

  const {purchasePercentage,error:purschaseError} = await getPurchasePercentage(courseId,userId,course.price!)
  if (purschaseError) return <ErrorPage message={purschaseError.message} />;

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-96 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressPercentage={progressPercentage ?? 0}
          purchasePercentage={purchasePercentage}
        />
      </div>
      <div className="hidden md:flex h-full w-96 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressPercentage={progressPercentage ?? 0}
          purchasePercentage={purchasePercentage}
        />
      </div>
      <main className="md:pl-80 h-full pt-[80px]">{children}</main>
    </div>
  );
}

export default CourseLayout;
