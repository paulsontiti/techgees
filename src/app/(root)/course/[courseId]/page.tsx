
import {
  Check,
} from "lucide-react";
import Banner from "@/components/banner";
import { getCourse } from "../../../../../actions/getCourse";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChapterContentAccordion } from "./_components/chapter-content-accordion";
import { CourseContentAccordion } from "./_components/course-content-accordion";
import { Preview } from "@/components/preview";
import { getCoursePrerequisiteWithIdAndTitle } from "../../../../../actions/getCoursePrerequisite";
import Link from "next/link";
import { getCourseRecommendedCourses } from "../../../../../actions/getCourseRecommendedCourses";
import { Button } from "@/components/ui/button";
import { getCountOfPaymentByCourseId } from "../../../../../actions/getCountOfPaymentByCourseId";

import { getCourseRating } from "../../../../../actions/getCourseRating";
import { getCourseComments } from "../../../../../actions/getCourseComments";
import { getCourseNumberOfRatings } from "../../../../../actions/getCourseNumberOfRatings";
import { getCourseLikesCount } from "../../../../../actions/getCourseLikesCount";
import { getCourseDisLikesCount } from "../../../../../actions/getCourseDisLikesCount";

import EnrollButton from "./_components/enroll-button";
import { getCourseWithCourseChildrenWithChaptersAndSessions } from "../../../../../actions/getCourseWithCourseChildrenWithChapters";
import CommentItem from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/sessions/[sessionId]/_components/comment-item";
import CourseWelcomeMessage from "./_components/course-welcome-message";

import Separator from "@/components/separator";
import { bgNeutralColor, textPrimaryColor } from "@/utils/colors";
import { hasStartedACourse } from "../../../../../actions/hasStartedACourse";
import ErrorPage from "@/components/error";

import VideoPlayer from "@/components/video-player";
import { getUserCookie } from "@/lib/get-user-cookie";


export type CategoryCourseType = {
  category: { id: string; name: string };
  courses: { id: string; title: string }[];
};

async function CourseIdPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {

  const userId = await getUserCookie() ?? "";

  const { course, error: courseError } = await getCourse(courseId);
  if (courseError)
    return <Banner variant="error" label={courseError.message} />;

  if (!course) return null

  const { courseChildrenWithChaptersAndSessions, error: comboError } = await getCourseWithCourseChildrenWithChaptersAndSessions(
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

  //check if student has started this course
  const { startedCourse, error } = await hasStartedACourse(userId,course.id)
  if (error) return <ErrorPage name={error.name} />

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


  return <>
    <CourseWelcomeMessage
      title={course?.title}
      subTitle={course?.subTitle ?? ""}
      numberOfDisLikes={numberOfDisLikes}
      numberOfLikes={numberOfLikes}
      numberOfPayments={numberOfPayments}
      numberOfRatings={numberOfRatings}
      averageRating={averageRating}
      commentLength={comments.length}
      courseId={course.id}

    />

    <div className={`flex flex-col  items-center justify-center ${bgNeutralColor} p-4`}>
      <div className="border-black border-2 my-16 w-full md:w-[400px] py-8 px-2 rounded-xl 
        flex items-center justify-around gap-x-2">

        <div className="flex flex-col items-center justify-center gap-y-4 ">
          <h2 className={`${textPrimaryColor}`}>Course status</h2>
          <Button variant={`${startedCourse ? "success" : "destructive"}`} size="sm">
            {`${startedCourse ? "Started" : "Not started"}`}</Button>
        </div>
        <Separator />

        <div className="flex flex-col items-center justify-center gap-y-4">
          <h2 className={`${textPrimaryColor}`}>Get started</h2>
          <EnrollButton courseId={courseId} label={`${startedCourse ? "Go to class" : "Start for free"}`} />

        </div>
      </div>
      <div className="w-full md:w-[700px] xl:w-[900px]">
        <div className="my-4 w-full">
          <VideoPlayer url={course?.overviewVideoUrl ?? ""} title="Course overview"/>
        </div>

        <EnrollButton courseId={course.id} label={`${startedCourse ? "Go to class" : "Start for free"}`}/>
        <div className="my-8 p-4">
          <h1 className={`${textPrimaryColor} text-xl font-bold`}>Course Details</h1>
          <Preview value={course?.description ?? ""} />
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
        <div className="mt-8 p-4">
          <h1 className={`text-xl font-bold ${textPrimaryColor}`}>Course content</h1>

        </div>
        {
          courseChildrenWithChaptersAndSessions.length > 0 ?
            courseChildrenWithChaptersAndSessions.map((course, index) => {

              return <CourseContentAccordion course={course} key={index} />
            })
            :
            course?.chapters.map((chapter) => {
              return <ChapterContentAccordion chapter={chapter} key={chapter.id} />;
            })}


        <div>
          <h1 className={`text-lg font-semibold mt-8 mb-2 ${textPrimaryColor}`}>Pre-requisite</h1>
          {preRequisiteCourses.length > 0 ? preRequisiteCourses.map((course) => {
            return <Link href={`/course/${course.id}`}
              className="text-xs md:text-sm" key={course.id}>
              {course.title}
            </Link>
          }) :
            <p className="text-xs md:text-sm">None</p>}
        </div>

        <div className="bg-white p-4 mt-8">
          <h1 className={`text-lg font-semibold mb-2 ${textPrimaryColor}`}>Recommended courses</h1>
          {recommendedCourses.length > 0 ?
            <div className="flex items-center flex-wrap gap-4">
              {
                recommendedCourses.map((course, index) => {
                  return <Button size="sm" variant="outline" key={index}>
                    <Link
                      className="text-xs md:text-sm" href={`/course/${course.id}`} key={course.id}>
                      {course.title}
                    </Link>
                  </Button>

                })
              }
            </div> :
            <p className="text-xs md:text-sm">None</p>}
        </div>


       <div className="mt-8">
       <EnrollButton courseId={course?.id} label={`${startedCourse ? "Go to class" : "Start for free"}`}/>
       </div>

        {Array.isArray(comments) && comments.length > 0 && <div className="mt-4 border p-2 max-w-full">
          <h1 className={`text-lg font-semibold mt-8 mb-2 ${textPrimaryColor}`}>Reviews</h1>
          {comments.map((comment, index) => {

            return <CommentItem comment={comment} key={index} />
          })}
        </div>}
      </div>
    </div>
  </>
}

export default CourseIdPage;


