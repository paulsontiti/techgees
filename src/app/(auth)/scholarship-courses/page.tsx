import React from "react";
import { getScholarshipCoursesByUserId } from "../../../../actions/getScholarshipCoursesByUserId";
import { getUserCookie } from "@/lib/get-user-cookie";
import { redirect } from "next/navigation";
import ErrorPage from "@/components/error";
import Link from "next/link";
import { getScholarshipByCourseId } from "../../../../actions/getScholarshipByCourseId";
import { getScholarshipRegisteredDate } from "../../../../actions/getScholarshipReisteredDate";
import ScholarshipCourseCard from "./_components/scholarship-card";
import { getScholarshipStudent } from "../../../../actions/getScholarshipStudent";
import { getScholarshipReferees } from "../../../../actions/getScholarshipReferees";
import { getScholarshipCoursesCount } from "../../../../actions/getScholarshipCoursesCount";

async function ScholarshipCoursePage() {
  const userId = await getUserCookie();
  if (!userId) return redirect("/sign-in");
  
  const url = process.env.WEB_URL!;

  const { scholarshipCourses, error } = await getScholarshipCoursesByUserId(
    userId
  );

  if (error) return <ErrorPage name={error.name} />;

  if (scholarshipCourses.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-y-4">
        You do not have any scholarship
        <Link href={`/scholarships`} className="underline text-blue-800">
          Check for available scholarship programs
        </Link>
      </div>
    );
  return (
    <section className="p-2 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold my-4">My Scholarship Courses</h2>
      <div className="w-full grid gap-8 lg:grid-cols-2 max-w-full">
        {scholarshipCourses.map(async (course) => {
          if (!course) return null;

          const { scholarship, error } = await getScholarshipByCourseId(
            course.id
          );
          if (error) return <ErrorPage name={error.name} key={Math.floor(Math.random())}/>;

          const { registeredDate, error: regError } =
            await getScholarshipRegisteredDate(userId, scholarship?.id || "");
          if (regError) return <ErrorPage name={regError.name} key={Math.random()}/>;

          const { scholarshipStudent, error: schError } =
            await getScholarshipStudent(scholarship?.id!);
          if (schError) return <ErrorPage name={schError.name} key={Math.random()}/>;

          const { referees, error: refError } =
            await getScholarshipReferees();
          if (refError) return <ErrorPage name={refError.name} key={Math.random()}/>;

          const {scholarshipCount,error:countError} = await getScholarshipCoursesCount(userId);
          if (countError) return <ErrorPage name={countError.name} key={Math.random()}/>;

          return (
            <ScholarshipCourseCard
              key={course.id}
              url={url}
              course={course}
              progressPercentage={course.progressPercentage}
              registeredDate={registeredDate!}
              scholarshipStudent={scholarshipStudent!}
              numberOfReferees={referees.length}
              scholarshipId={scholarship?.id || ""}
              scholarshipCount={scholarshipCount}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ScholarshipCoursePage;
