import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import CourseSidebar from "./_components/course-sidebar";
import ErrorPage from "@/components/error";
import CourseNavbar from "./_components/course-navbar";
import { getCourseChaptersUserProgress } from "../../../../../../actions/getCourseChaptersUserProgress";
import { getCourseProgress } from "../../../../../../actions/getCourseProgress";
import { getPurchasePercentage } from "../../../../../../actions/getPurchasePercentage";

async function CourseLayout({
  children,
  params: { courseId },
}: {
  children: React.ReactNode;
  params: { courseId: string }
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



  const { purchasePercentage, error: purschaseError } = await getPurchasePercentage(courseId, userId)
  if (purschaseError) return <ErrorPage name={purschaseError.name} />;

  return (
    <div>
      <div>
        <CourseNavbar
          course={course}
          progressPercentage={progressPercentage ?? 0}
          purchasePercentage={purchasePercentage}
        />
      </div>
      <div className="flex mt-10 justify-center">
      <div className="hidden max-h-[100vh]  md:flex w-1/3 flex-col inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressPercentage={progressPercentage ?? 0}
          purchasePercentage={purchasePercentage}
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
