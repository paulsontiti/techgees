import React from "react";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";
import ErrorPage from "@/components/error";
import { getCourseChaptersUserProgress } from "../../../../../../actions/getCourseChaptersUserProgress";
import { getUserCookie } from "@/lib/get-user-cookie";
import { redirect } from "next/navigation";
import { getCoursePurchase } from "../../../../../../actions/getCoursePurchase";
import { getPurchasePercentage } from "../../../../../../actions/getPurchasePercentage";
import { getPaidChapterPositions } from "../../../../../../actions/getPaidChapterPositions";
import { getCourseProgress } from "../../../../../../actions/getCourseProgress";
import { getScholarshipByCourseId } from "../../../../../../actions/getScholarshipByCourseId";

async function CourseLayout({
  children,
  params: { courseId },
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const userId = await getUserCookie();
    if (!userId) return redirect("/dashboard");

  const { course, error: couError } = await getCourseChaptersUserProgress(
    userId!,
    courseId
  );
  if (couError) return <ErrorPage name={couError.name} />;
  if (!course) return redirect("/dashboard");

  const { coursePurchase, error: purError } = await getCoursePurchase(
    userId!,
    courseId
  );
  if (purError) return <ErrorPage name={purError.name} />;

  const { purchasePercentage, error: purPerError } =
    await getPurchasePercentage(userId!, courseId);
  if (purPerError) return <ErrorPage name={purPerError.name} />;

  const { paidPositions, error: paidError } =
    await getPaidChapterPositions(courseId,purchasePercentage);
  if (paidError) return <ErrorPage name={paidError.name} />;
 

       const { progressPercentage, error:proError } = await getCourseProgress(userId!,
  courseId)
  if (proError) return <ErrorPage name={proError.name} />;

    const { scholarship, error: schCourseError } =
      await getScholarshipByCourseId (courseId);
  
    if (schCourseError) return <ErrorPage name={schCourseError.name} />;


    const url = process.env.WEB_URL!;

  return (
    <div>
      <div>
        <CourseNavbar   course={course}
              scholarship={scholarship}
            coursePurchasePrice={coursePurchase?.price || 0}
            purchasePercentage={purchasePercentage}
            paidPositions={paidPositions}
            progressPercentage={progressPercentage || 0}/>
      </div>
      <div className="flex mt-10 justify-center">
        <div className="hidden h-full  md:flex w-1/3 flex-col inset-y-0 z-50">
          <CourseSidebar
            course={course}
             scholarship={scholarship}
            url={url}
            userId={userId}
            progressPercentage={progressPercentage || 0}
             paidPositions={paidPositions}
          />
        </div>
        <div className="px-4 md:w-2/3">{children}</div>
      </div>
    </div>
  );
}

export default CourseLayout;
