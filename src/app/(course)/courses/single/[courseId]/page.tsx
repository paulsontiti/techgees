import React from "react";
import ErrorPage from "@/components/error";
import { redirect } from "next/navigation";
import VerifyPayment from "../../components/verify-payment";
import CourseDetails from "./_components/course-details";
import CourseCompletedProgress from "./_components/course-completed-progress";
import { SingleCourseEnrollButton } from "./_components/single-course-enroll-button";
import { getCourseChaptersUserProgress } from "../../../../../../actions/getCourseChaptersUserProgress";
import { getUserCookie } from "@/lib/get-user-cookie";
import { getScholarshipByCourseId } from "../../../../../../actions/getScholarshipByCourseId";

async function CourseIdPage({
  params: { courseId },
  searchParams: { reference, redirectUrl },
}: {
  params: { courseId: string };
  searchParams: { reference: string; redirectUrl: string };
}) {
  const userId = await getUserCookie();

  const { course, error } = await getCourseChaptersUserProgress(
    userId!,
    courseId
  );

  if (error) return <ErrorPage name={error.name} />;

  const { scholarship, error: schCourseError } =
    await getScholarshipByCourseId(courseId);

  if (schCourseError) return <ErrorPage name={schCourseError.name} />;

  if (!course) return redirect("/dashboard");

  const url = process.env.WEB_URL!;

  return (
    <div className="flex flex-col gap-4">
      <VerifyPayment redirectUrl={redirectUrl} reference={reference} />
      <CourseCompletedProgress courseId={courseId} />

      <SingleCourseEnrollButton
                courseId={courseId}
                scholarship={scholarship}
                userId={userId!}
                url={url}
              />
      
      <CourseDetails scholarshipCourse={!!scholarship} course={course} />
    </div>
  );
}

export default CourseIdPage;
