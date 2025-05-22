import StatInfo from "@/app/(root)/course/[courseId]/_components/course-stat-info";
import { Preview } from "@/components/preview";
import CourseChaptersAndSessionsDetails from "@/components/course/course-chapters-sessions-details";
import VideoPlayer from "@/components/video-player";
import CourseComments from "@/app/(course)/courses/components/course-comments";
import CourseBenefits from "@/app/(course)/courses/components/course-benefits";
import { getCourse } from "../../../../../../../../actions/getCourse";
import ErrorPage from "@/components/error";
import { redirect } from "next/navigation";
import { OpenSheetButton } from "@/components/open-sheet";

export type CategoryCourseType = {
  category: { id: string; name: string };
  courses: { id: string; title: string }[];
};

async function CourseIdPage({
  params: { childId },
}: {
  params: { childId: string };
}) {
  const { course, error } = await getCourse(childId);

  if (error) return <ErrorPage name={error.name} />;

  if (!course) return redirect("/dashboard");

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full md:w-[700px] xl:w-[900px]">
    <OpenSheetButton label="Back to main course"/>
        <div className="bg-white p-2">
          <h1 className="mt-4 text-xl font-bold">{course?.title}</h1>

          <h2 className="mt-2 text-md md:w-2/3 mb-10">{course?.subTitle}</h2>
        </div>

        <StatInfo courseId={childId} />

        <div className="my-4 w-full">
          <VideoPlayer
            url={course?.overviewVideoUrl ?? ""}
            title="Course Overview"
          />
        </div>
        <div className="mt-8">
          <h1 className="text-xl font-bold">Course content</h1>
          <div className="mt-4 flex items-center gap-x-2 text-xs md:text-sm">
            <CourseChaptersAndSessionsDetails courseId={childId} />
          </div>
        </div>

        <CourseBenefits courseId={course?.id} />

        <div className="bg-white p-2 my-4">
          <h1 className="text-lg font-semibold mt-8">Description</h1>
          <Preview value={course?.description ?? ""}></Preview>
        </div>

        <CourseComments courseId={course?.id} />
      </div>
    </div>
  );
}

export default CourseIdPage;
