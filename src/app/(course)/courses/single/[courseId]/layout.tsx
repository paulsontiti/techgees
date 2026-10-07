import React from "react";
import CourseNavbar from "./_components/course-navbar";
async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const userId = await getUserCookie();
  // if (!userId) return redirect("/dashboard");

  // const { course, error: couError } = await getCourseChaptersUserProgress(
  //   userId!,
  //   courseId,
  // );
  // if (couError) return <ErrorPage name={couError.name} />;
  // if (!course) return redirect("/dashboard");

  // const { progressPercentage, error: proError } = await getCourseProgress(
  //   userId!,
  //   courseId,
  // );
  // if (proError) return <ErrorPage name={proError.name} />;

  return (
    <div>
      <div>
        <CourseNavbar
        />
      </div>
      {/* <div className="flex mt-10 justify-center"> */}
        {/* <div className="hidden h-full  md:flex w-1/3 flex-col inset-y-0 z-50">
          <CourseSidebar
            course={course}
            userId={userId}
            progressPercentage={progressPercentage || 0}
          />
        </div> */}
        <div>{children}</div>
      {/* </div> */}
    </div>
  );
}

export default CourseLayout;
