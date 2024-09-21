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
  if (!userId) return redirect("/sign-in");

  const { course, error: courseError } = await getCourseChaptersUserProgress(
    userId,
    courseId
  );
  
  if (courseError) return <ErrorPage name={courseError.name} />;
  if (!course) return redirect("/");

  const { progressPercentage, error } = await getCourseProgress(
    userId,
    courseId
  );
  if (error) return <ErrorPage name={error.name} />;

 

  const {purchasePercentage,error:purschaseError} = await getPurchasePercentage(courseId,userId)
  if (purschaseError) return <ErrorPage name={purschaseError.name} />;

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-[320px] 2xl:pl-[400px] fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressPercentage={progressPercentage ?? 0}
          purchasePercentage={purchasePercentage}
        />
      </div>
      <div className="hidden md:flex h-full w-[300px] 2xl:w-[400px] flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressPercentage={progressPercentage ?? 0}
          purchasePercentage={purchasePercentage}
        />
      </div>
      <main className="md:pl-[320px] 2xl:pl-[400px] h-full pt-[80px]">{children}</main>
    </div>
  );
}

export default CourseLayout;
