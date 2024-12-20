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
import Banner from "@/components/banner";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CommentItem from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/sessions/[sessionId]/_components/comment-item";
import { getCourseCategoriesByCourseId } from "../../../../../../../../actions/getCourseCategoriesByCourseId";
import { getCourse } from "../../../../../../../../actions/getCourse";
import { getCourseWithCourseChildrenWithChaptersAndSessions } from "../../../../../../../../actions/getCourseWithCourseChildrenWithChapters";
import { getCoursePrerequisiteWithIdAndTitle } from "../../../../../../../../actions/getCoursePrerequisite";
import { getCourseRecommendedCourses } from "../../../../../../../../actions/getCourseRecommendedCourses";
import { getCountOfPaymentByCourseId } from "../../../../../../../../actions/getCountOfPaymentByCourseId";
import { getCourseComments } from "../../../../../../../../actions/getCourseComments";
import { getCourseRating } from "../../../../../../../../actions/getCourseRating";
import { getCourseNumberOfRatings } from "../../../../../../../../actions/getCourseNumberOfRatings";
import { getCourseLikesCount } from "../../../../../../../../actions/getCourseLikesCount";
import { getCourseDisLikesCount } from "../../../../../../../../actions/getCourseDisLikesCount";
import StatInfo from "@/app/(root)/course/[courseId]/_components/stat-info";
import { Preview } from "@/components/preview";


export type CategoryCourseType = {
  category: { id: string; name: string };
  courses: { id: string; title: string }[];
};

async function CourseIdPage({
  params: { childId },
}: {
  params: { childId: string };
}) {
  const { categories, error } =
    await getCourseCategoriesByCourseId(childId);

  if (error) return <Banner variant="error" label={error.message} />;

  const { course, error: courseError } = await getCourse(childId);
  if (courseError)
    return <Banner variant="error" label={courseError.message} />;

  if (!course) return null

  const { courseChildrenWithChaptersAndSessions, error: comboError } =
    await getCourseWithCourseChildrenWithChaptersAndSessions(
      childId
    );
  if (comboError) return <Banner variant="error" label={comboError.message} />;


  const { preRequisiteCourses, error: preError } = await getCoursePrerequisiteWithIdAndTitle(
    childId
  );
  if (preError) return <Banner variant="error" label={preError.message} />;

  const { recommendedCourses, error: recommError } = await getCourseRecommendedCourses(
    childId
  );
  if (recommError) return <Banner variant="error" label={recommError.message} />;

  const { numberOfPayments, error: paymentError } = await getCountOfPaymentByCourseId(
    childId
  );
  if (paymentError) return <Banner variant="error" label={paymentError.message} />;

  const { comments, error: commError } = await getCourseComments(
    childId
  );
  if (commError) return <Banner variant="error" label={commError.message} />;

  const { averageRating, error: ratingError } = await getCourseRating(
    childId
  );
  if (ratingError) return <Banner variant="error" label={ratingError.message} />;


  const { numberOfRatings, error: numRatingError } = await getCourseNumberOfRatings(
    childId
  );
  if (numRatingError) return <Banner variant="error" label={numRatingError.message} />;

  const { numberOfLikes, error: likesError } = await getCourseLikesCount(
    childId
  );
  if (likesError) return <Banner variant="error" label={likesError.message} />;

  const { numberOfDisLikes, error: disLikesError } = await getCourseDisLikesCount(
    childId
  );
  if (disLikesError) return <Banner variant="error" label={disLikesError.message} />;


  let chaptersLength = 0;
  let sessionslength = 0;
  let duration = 0;

  if (course !== null) {
    if (courseChildrenWithChaptersAndSessions.length > 0) {
      courseChildrenWithChaptersAndSessions.map((child) => {
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
    <div className=" flex items-center justify-center ">
      <div className="w-full md:w-[700px] xl:w-[900px]">
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
          </Breadcrumb>
        </div>
        <h1 className="mt-4 text-xl font-bold">{course?.title}</h1>
        <h2 className="mt-2 text-md md:w-2/3 mb-10">{course?.subTitle}</h2>


        <StatInfo
          numberOfRatings={numberOfRatings}
          numberOfStudents={numberOfPayments}
          numberOfComments={comments.length}
          likes={numberOfLikes}
          disLikes={numberOfDisLikes} rating={averageRating} />

        <div className="my-4 w-full">
          <video src={course?.overviewVideoUrl ?? ""} controls title="Course overview" className="w-full" />
        </div>


        {Array.isArray(course?.courseBenefits) && course.courseBenefits.length > 0 &&
          <Card className="mt-4 w-full">
            <CardHeader className="text-xl font-bold">
              Benefits of taking this course
            </CardHeader>
            <CardContent className="flex flex-col">
              {course?.courseBenefits.map((benefit) => {
                return (
                  <div key={benefit.id} className="flex items-start my-2 gap-2">
                    <Check className="max-w-4 max-h-4 min-w-4 min-h-4" />
                    <div className="text-xs md:text-sm">{benefit.text}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>}
        <div className="mt-8">
          <h1 className="text-xl font-bold">Course content</h1>
          <div className="mt-4 flex items-center gap-x-2 text-xs md:text-sm">
            {courseChildrenWithChaptersAndSessions.length > 0 && (
              <div className="flex items-center gap-x-1">
                {courseChildrenWithChaptersAndSessions.length} courses
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





        <h1 className="text-lg font-semibold mt-8">Description</h1>
        <Preview value={course?.description ?? ""}></Preview>


        {Array.isArray(comments) && comments.length > 0 && <div className="mt-4 border p-2 max-w-full">
          <h1 className="text-lg font-semibold mb-2">Reviews</h1>
          {comments.map((comment, index) => {

            return <CommentItem comment={comment} key={index} />
          })}
        </div>}
      </div>
    </div>
  );
}

export default CourseIdPage;


