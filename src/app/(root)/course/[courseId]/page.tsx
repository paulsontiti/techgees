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
import { getCourseCategoriesByCourseId } from "../../../../../actions/getCourseCategoriesByCourseId";
import Banner from "@/components/banner";
import { getCourse } from "../../../../../actions/getCourse";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getChildrenCourses } from "../../../../../actions/getChildrenCourses";
import { ChapterContentAccordion } from "./_components/chapter-content-accordion";
import { CourseContentAccordion } from "./_components/course-content-accordion";
import { Preview } from "@/components/preview";
import { getCoursePrerequisiteWithIdAndTitle } from "../../../../../actions/getCoursePrerequisite";
import Link from "next/link";
import { getCourseRecommendedCourses } from "../../../../../actions/getCourseRecommendedCourses";
import { Button } from "@/components/ui/button";
import { getCountOfPaymentByCourseId } from "../../../../../actions/getCountOfPaymentByCourseId";
import { getCountOfCommentsByCourseId } from "../../../../../actions/getCountOfCommentsByCourseId";
import { RatingSlider } from "@/components/rating-slider";
import StatInfo from "./_components/stat-info";

export type CategoryCourseType = {
  category: { id: string; name: string };
  courses: { id: string; title: string }[];
};

async function CourseIdPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const { categories, error } =
    await getCourseCategoriesByCourseId(courseId);

  if (error) return <Banner variant="error" label={error.message} />;

  const { course, error: courseError } = await getCourse(courseId);
  if (courseError)
    return <Banner variant="error" label={courseError.message} />;

  const { childrenCourses, error: comboError } = await getChildrenCourses(
    courseId
  );
  if (comboError) return <Banner variant="error" label={comboError.message} />;


  const { preRequisiteCourses, error: preError } = await getCoursePrerequisiteWithIdAndTitle(
    courseId
  );
  if (preError) return <Banner variant="error" label={preError.message} />;

  const { recommendedCourses, error: recommError } = await getCourseRecommendedCourses(
    courseId
  );
  if (recommError) return <Banner variant="error" label={recommError.message} />;

  const { numberOfPayments, error: paymentError } = await getCountOfPaymentByCourseId(
    courseId
  );
  if (paymentError) return <Banner variant="error" label={paymentError.message} />;

  const { numberOfComments, error: commError } = await getCountOfCommentsByCourseId(
    courseId
  );
  if (commError) return <Banner variant="error" label={commError.message} />;


  let chaptersLength = 0;
  let sessionslength = 0;
  let duration = 0;

  if (course !== null) {
    if (childrenCourses.length > 0) {
      childrenCourses.map((child) => {
        chaptersLength += child.chapters.length;
        child.chapters.map((chapter) => {
          chapter.sessions.map((session) => {
            sessionslength++;
            duration += session.videoDuration ?? 0;
          });
        });
      });
    } else {
      const chapters = course.chapters.map((courseChapter) => courseChapter);
      chaptersLength = course?.chapters.length ?? 0;

      chapters.map((chapter) => {
        chapter.sessions.map((session) => {
          sessionslength++;
          duration += session.videoDuration ?? 0;
        });
      });

    
    }
  }

  const wywl = [
    "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
    "After the course you will be able to build ANY website you want.",
    "Work as a freelance web developer.",
    "Master backend development with Node",
    "Learn the latest technologies, including Javascript, React, Node and even Web3 development.",
    "Build fully-fledged websites and web apps for your startup or business.",
    "Master frontend development with React",
    "Learn professional developer best practices.",
  ];
  return (
    <div className="px-4">
      <RatingSlider/>
      <div className="mt-8">
        <Breadcrumb>
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
                        <DropdownMenuTrigger className="text-xs flex">
                          <div className="text-sky-500"> {cat.name}</div>
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
        </Breadcrumb>
      </div>
      <h1 className="mt-4 text-xl font-bold">{course?.title}</h1>
      <h2 className="mt-2 text-lg font-semibold">Subtitle</h2>
      

      <StatInfo
      numberOfComments={numberOfComments}
      numberOfStudents={numberOfPayments}
      likes={300}
      disLikes={12}
      />
      <Card className="mt-4">
        <CardHeader className="text-xl font-bold">
          Benefits of taking this course
        </CardHeader>
        <CardContent className="flex md:flex-row flex-col">
          {wywl.map((item) => {
            return (
              <div key={item} className="flex items-start my-2 gap-2">
                <Check className="max-w-4 max-h-4 min-w-4 min-h-4" />
                <div className="text-xs">{item}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h1 className="text-xl font-bold">Course content</h1>
        <div className="mt-4 flex items-center gap-x-2 text-xs">
          {childrenCourses.length > 0 && (
            <div className="flex items-center gap-x-1">
              {childrenCourses.length} courses
            </div>
          )}
          <div className="flex items-center gap-x-1">
            {chaptersLength} chapters
          </div>
          <div className="flex items-center gap-x-1">
            {sessionslength} sessions
          </div>
          <div className="flex items-center gap-x-1">{duration} mins(total length)</div>
        </div>
      </div>
      {
      childrenCourses.length > 0 ? 
      childrenCourses.map((course)=>{

        return <CourseContentAccordion course={course}/>
      })
      :
      course?.chapters.map((chapter) => {
        return <ChapterContentAccordion chapter={chapter} key={chapter.id} />;
      })}

      <div>
      <h1 className="text-lg font-semibold mt-8 mb-2">Pre-requisite</h1>
        {preRequisiteCourses.length > 0 ? preRequisiteCourses.map((course)=>{
          return <Link href={`/course/${course.id}`} 
          className="text-xs" key={course.id}>
            {course.title}
          </Link>
        }) :
        <p   className="text-xs">None</p>}
      </div>

      <div>
      <h1 className="text-lg font-semibold mt-8 mb-2">Recommended courses</h1>
        {recommendedCourses.length > 0 ? 
        <div className="flex items-center flex-wrap gap-1">
          {
            recommendedCourses.map((course)=>{
              return <Button size="sm" variant="outline">
                <Link
                  className="text-xs" href={`/course/${course.id}`} key={course.id}>
                {course.title}
              </Link>
              </Button>
               
            })
          }
        </div> :
           <p   className="text-xs">None</p>}
      </div>

      <h1 className="text-lg font-semibold mt-8">Description</h1>
      <Preview value={course?.description ?? ""}></Preview>

      <div className="mt-4 border p-2">
             <h1 className="text-lg font-semibold mb-2">Reviews</h1>
      </div>
    </div>
  );
}

export default CourseIdPage;
