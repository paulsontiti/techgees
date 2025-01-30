
"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/db";
import {
  Check,
  ChevronDown,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CommentItem from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/sessions/[sessionId]/_components/comment-item";

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
  // const { categories, error } =
  //   await getCourseCategoriesByCourseId(childId);

  // if (error) return <Banner variant="error" label={error.message} />;

  // const { course, error: courseError } = await getCourse(childId);
  // if (courseError)
  //   return <Banner variant="error" label={courseError.message} />;

  // if (!course) return null

  // const { courseChildren, error: comboError } =
  //   await getCourseWithCourseChildren(
  //     childId
  //   );
  // if (comboError) return <Banner variant="error" label={comboError.message} />;



  // const { comments, error: commError } = await getCourseComments(
  //   childId
  // );
  // if (commError) return <Banner variant="error" label={commError.message} />;

const [course,setCourse] = useState<Course | undefined>(undefined);

useEffect(()=>{
  (
    async()=>{
      try{
        const res = await axios.get(`/api/courses/${childId}`);
        setCourse(res.data);
      }catch(err:any){
        toast.error(err.message);
      }
    }
  )()
},[]);

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full md:w-[700px] xl:w-[900px]">
        <div className="mt-8">
          {/* <Breadcrumb>
            <BreadcrumbList>
              {Array.isArray(categories) &&
                categories.length > 0 &&
                categories.map(async (cat) => {
                  const courseCategories = await db.courseCategory.findMany({
                    where: {
                      categoryId: cat.id,
                    },
                    include: {
                      course: true,
                    },
                  });

                  const courses = courseCategories.map((c) => {
                    return {
                      title: c.course.title,
                      id: c.course.id,
                    };
                  });

                  return (
                    <div key={cat.id}>
                      <BreadcrumbItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger className=" flex items-center">
                            <div className="text-sky-500 text-xs xl:text-sm"> {cat.name}</div>
                            {Array.isArray(courses) && courses.length > 0 && (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </DropdownMenuTrigger>
                          {Array.isArray(courses) && courses.length > 0 && (
                            <DropdownMenuContent align="start">
                              {courses.map((course) => {
                                return (
                                  <DropdownMenuItem key={course.id}>
                                    <BreadcrumbLink href={`/course/${course.id}`}>
                                      {course.title}
                                    </BreadcrumbLink>
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuContent>
                          )}
                        </DropdownMenu>
                      </BreadcrumbItem>
                    </div>
                  );
                })}
            </BreadcrumbList>
          </Breadcrumb> */}
        </div>
     <div className="bg-white p-2">
     {course === undefined ? <Skeleton className="w-full h-10 my-2"/> :  <h1 className="mt-4 text-xl font-bold">{course?.title}</h1>}
       {course === undefined ? <Skeleton className="w-full h-10 my-2"/> : 
       <h2 className="mt-2 text-md md:w-2/3 mb-10">{course?.subTitle}</h2>
}
     </div>



        <StatInfo courseId={childId} />

        <div className="my-4 w-full">
          <VideoPlayer url={course?.overviewVideoUrl ?? ""} title="Course Overview"/>
        </div>

        {course === undefined ? <Skeleton className="w-full h-20 my-2"/>: <CourseBenefits courseId={course?.id}/>}
        <div className="mt-8">
          <h1 className="text-xl font-bold">Course content</h1>
          <div className="mt-4 flex items-center gap-x-2 text-xs md:text-sm">
           
        <CourseChaptersAndSessionsDetails courseId={childId}/>
          </div>
        </div>





       {course === undefined ? <Skeleton className="w-full h-72 my-2"/> : <div className="bg-white p-2 my-4">
        <h1 className="text-lg font-semibold mt-8">Description</h1>
        <Preview value={course?.description ?? ""}></Preview>
       </div>}


      {course === undefined ? <Skeleton className="w-full h-72 my-2"/>
      :  <CourseComments courseId={course?.id}/>}
      </div>
    </div>
  );
}

export default CourseIdPage;


