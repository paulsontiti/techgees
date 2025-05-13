"use client";

import StatInfo from "@/app/(root)/course/[courseId]/_components/course-stat-info";
import { Preview } from "@/components/preview";
import CourseChaptersAndSessionsDetails from "@/components/course/course-chapters-sessions-details";
import VideoPlayer from "@/components/video-player";
import { useEffect, useState } from "react";
import { Course } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import CourseComments from "@/app/(course)/courses/components/course-comments";
import CourseBenefits from "@/app/(course)/courses/components/course-benefits";

export type CategoryCourseType = {
  category: { id: string; name: string };
  courses: { id: string; title: string }[];
};

function CourseIdPage({
  params: { childId },
}: {
  params: { childId: string };
}) {
  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/courses/${childId}`);
        setCourse(res.data);
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full md:w-[700px] xl:w-[900px]">
        <div className="mt-8"></div>
        <div className="bg-white p-2">
          {course === undefined ? (
            <Skeleton className="w-full h-10 my-2" />
          ) : (
            <h1 className="mt-4 text-xl font-bold">{course?.title}</h1>
          )}
          {course === undefined ? (
            <Skeleton className="w-full h-10 my-2" />
          ) : (
            <h2 className="mt-2 text-md md:w-2/3 mb-10">{course?.subTitle}</h2>
          )}
        </div>

        <StatInfo courseId={childId} />

        <div className="my-4 w-full">
          <VideoPlayer
            url={course?.overviewVideoUrl ?? ""}
            title="Course Overview"
          />
        </div>

        {course === undefined ? (
          <Skeleton className="w-full h-20 my-2" />
        ) : (
          <CourseBenefits courseId={course?.id} />
        )}
        <div className="mt-8">
          <h1 className="text-xl font-bold">Course content</h1>
          <div className="mt-4 flex items-center gap-x-2 text-xs md:text-sm">
            <CourseChaptersAndSessionsDetails courseId={childId} />
          </div>
        </div>

        {course === undefined ? (
          <Skeleton className="w-full h-72 my-2" />
        ) : (
          <div className="bg-white p-2 my-4">
            <h1 className="text-lg font-semibold mt-8">Description</h1>
            <Preview value={course?.description ?? ""}></Preview>
          </div>
        )}

        {course === undefined ? (
          <Skeleton className="w-full h-72 my-2" />
        ) : (
          <CourseComments courseId={course?.id} />
        )}
      </div>
    </div>
  );
}

export default CourseIdPage;
