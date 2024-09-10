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

import StatInfo from "./_components/stat-info";
import { getCourseRating } from "../../../../../actions/getCourseRating";
import { getCourseComments } from "../../../../../actions/getCourseComments";
import { getCourseNumberOfRatings } from "../../../../../actions/getCourseNumberOfRatings";
import { getCourseLikesCount } from "../../../../../actions/getCourseLikesCount";
import { getCourseDisLikesCount } from "../../../../../actions/getCourseDisLikesCount";
import CommentItem from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/sessions/[sessionId]/_components/comment-item";

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

  const { comments, error: commError } = await getCourseComments(
    courseId
  );
  if (commError) return <Banner variant="error" label={commError.message} />;

  const { averageRating, error: ratingError } = await getCourseRating(
    courseId
  );
  if (ratingError) return <Banner variant="error" label={ratingError.message} />;


  const { numberOfRatings, error: numRatingError } = await getCourseNumberOfRatings(
    courseId
  );
  if (numRatingError) return <Banner variant="error" label={numRatingError.message} />;

  const { numberOfLikes, error: likesError } = await getCourseLikesCount(
    courseId
  );
  if (likesError) return <Banner variant="error" label={likesError.message} />;

  const { numberOfDisLikes, error: disLikesError } = await getCourseDisLikesCount(
    courseId
  );
  if (disLikesError) return <Banner variant="error" label={disLikesError.message} />;


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


  return (
    <div className="px-4">

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
      <h2 className="mt-2 text-md font-medium">{course?.subTitle}</h2>


      <StatInfo
        numberOfRatings={numberOfRatings}
        numberOfStudents={numberOfPayments}
        numberOfComments={comments.length}
        likes={numberOfLikes}
        disLikes={numberOfDisLikes} rating={averageRating} />

      {Array.isArray(course?.whatToLearn) && course.whatToLearn.length > 0 &&
        <div className="mt-4">
          <h2 className="text-lg font-semibold">What you will learn</h2>
          {course.whatToLearn.map((wtl) => {

            return <div key={wtl.id} className="flex items-start my-2 gap-2">
              <Check className="max-w-4 max-h-4 min-w-4 min-h-4" />
              <div className="text-xs">{wtl.text}</div>
            </div>
          })}
        </div>
      }
      {Array.isArray(course?.courseBenefits) && course.courseBenefits.length > 0 &&
        <Card className="mt-4">
          <CardHeader className="text-xl font-bold">
            Benefits of taking this course
          </CardHeader>
          <CardContent className="flex md:flex-row flex-col">
            {course?.courseBenefits.map((benefit) => {
              return (
                <div key={benefit.id} className="flex items-start my-2 gap-2">
                  <Check className="max-w-4 max-h-4 min-w-4 min-h-4" />
                  <div className="text-xs">{benefit.text}</div>
                </div>
              );
            })}
          </CardContent>
        </Card>}
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
          childrenCourses.map((course,index) => {

            return <CourseContentAccordion course={course} key={index}/>
          })
          :
          course?.chapters.map((chapter) => {
            return <ChapterContentAccordion chapter={chapter} key={chapter.id} />;
          })}

      <div>
        <h1 className="text-lg font-semibold mt-8 mb-2">Pre-requisite</h1>
        {preRequisiteCourses.length > 0 ? preRequisiteCourses.map((course) => {
          return <Link href={`/course/${course.id}`}
            className="text-xs" key={course.id}>
            {course.title}
          </Link>
        }) :
          <p className="text-xs">None</p>}
      </div>

      <div>
        <h1 className="text-lg font-semibold mt-8 mb-2">Recommended courses</h1>
        {recommendedCourses.length > 0 ?
          <div className="flex items-center flex-wrap gap-1">
            {
              recommendedCourses.map((course,index) => {
                return <Button size="sm" variant="outline" key={index}>
                  <Link
                    className="text-xs" href={`/course/${course.id}`} key={course.id}>
                    {course.title}
                  </Link>
                </Button>

              })
            }
          </div> :
          <p className="text-xs">None</p>}
      </div>

      <h1 className="text-lg font-semibold mt-8">Description</h1>
      <Preview value={course?.description ?? ""}></Preview>

      <div className="mt-4 border p-2">
        <h1 className="text-lg font-semibold mb-2">Reviews</h1>
        {comments.map((comment,index) => {

          return <CommentItem comment={comment} key={index}/>
        })}
      </div>
    </div>
  );
}

export default CourseIdPage;
