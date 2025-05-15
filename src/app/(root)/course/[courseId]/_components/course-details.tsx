"use client";
import { Button } from "@/components/ui/button";
import {
  bgNeutralColor,
  bgNeutralColor2,
  textPrimaryColor,
} from "@/utils/colors";
import React, { useEffect, useState } from "react";
import EnrollButton from "./enroll-button";
import VideoPlayer from "@/components/video-player";
import { Preview } from "@/components/preview";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { CourseContentAccordion } from "./course-content-accordion";
import { ChapterContentAccordion } from "./chapter-content-accordion";
import { CourseType } from "../../../../../../actions/getCourse";
import { Course } from "@prisma/client";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Separator from "@/components/separator";
import CourseChaptersAndSessionsDetails from "@/components/course/course-chapters-sessions-details";

function CourseDetails({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState<CourseType | null | undefined>(
    undefined
  );
  const [startedCourse, setStartedCourse] = useState<boolean | undefined>(
    undefined
  );
  const [courseChildren, setCourseChildren] = useState<Course[] | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}/started-course`);
        setStartedCourse(res.data);
      } catch (err) {
        setStartedCourse(false);
      }
    })();
  }, []);

  //get course
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        setCourse(null);
      }
    })();
  }, []);

  //get course children
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}/course-children`);
        setCourseChildren(res.data);
      } catch (err) {
        setCourseChildren([]);
      }
    })();
  }, []);

  return (
    <div
      className={`flex flex-col  items-center justify-center ${bgNeutralColor} p-4`}
    >
      <div
        className="border-black border-2 my-16 w-full md:w-[400px] py-8 px-2 rounded-xl 
      flex items-center justify-around gap-x-2"
      >
        <div className="flex flex-col items-center justify-center gap-y-4 ">
          <h2 className={`${textPrimaryColor}`}>Course status</h2>
          {startedCourse !== undefined ? (
            <Button
              variant={`${startedCourse ? "success" : "destructive"}`}
              size="sm"
            >
              {`${startedCourse ? "Started" : "Not started"}`}
            </Button>
          ) : (
            <Skeleton className="w-32 h-10 bg-red-300" />
          )}
        </div>
        <Separator />

        <div className="flex flex-col items-center justify-center gap-y-4">
          <h2 className={`${textPrimaryColor}`}>Get started</h2>
          <EnrollButton
            courseId={courseId}
            label={`${startedCourse ? "Go to class" : "Start for free"}`}
          />
        </div>
      </div>
      <div className="w-full md:w-[700px] xl:w-[900px]">
        {course !== undefined ? (
          <div className="my-4 w-full">
            <VideoPlayer
              url={course?.overviewVideoUrl ?? ""}
              title="Course overview"
            />
          </div>
        ) : (
          <Skeleton className={`w-full my-4 h-72 ${bgNeutralColor2}`} />
        )}

        {course !== undefined ? (
          <EnrollButton
            courseId={course?.id || ""}
            label={`${startedCourse ? "Go to class" : "Start for free"}`}
          />
        ) : (
          <Skeleton className={`w-full h-10 ${bgNeutralColor2}`} />
        )}
        <div className="my-8 p-4">
          <h1 className={`${textPrimaryColor} text-xl font-bold`}>
            Course Details
          </h1>
          {course !== undefined ? (
            <Preview value={course?.description ?? ""} />
          ) : (
            <Skeleton className={`w-full mt-4 h-[200px] ${bgNeutralColor2}`} />
          )}
        </div>
        {course !== undefined ? (
          Array.isArray(course?.courseBenefits) &&
          course.courseBenefits.length > 0 && (
            <Card className="mt-4 w-full">
              <CardHeader className="text-xl font-bold">
                Benefits of taking this course
              </CardHeader>
              <CardContent className="flex flex-col">
                {course?.courseBenefits.map((benefit) => {
                  return (
                    <div
                      key={benefit.id}
                      className="flex items-start my-2 gap-2"
                    >
                      <Check className="max-w-4 max-h-4 min-w-4 min-h-4" />
                      <div className="text-xs md:text-sm">{benefit.text}</div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )
        ) : (
          <Skeleton className={`w-full mt-4 h-[200px] ${bgNeutralColor2}`} />
        )}
        <div className="mt-8 p-4">
          <h1 className={`text-xl font-bold ${textPrimaryColor}`}>
            Course content
          </h1>
        </div>
        {courseChildren?.length === 0 && (
          <CourseChaptersAndSessionsDetails courseId={courseId} />
        )}
        {courseChildren !== undefined ? (
          <>
            {courseChildren?.length > 0
              ? courseChildren.map((course, index) => {
                  return (
                    <CourseContentAccordion
                      courseId={course.id}
                      courseTitle={course.title}
                      key={index}
                    />
                  );
                })
              : course?.chapters.map((chapter) => {
                  return (
                    <ChapterContentAccordion
                      chapter={chapter}
                      key={chapter.id}
                    />
                  );
                })}
          </>
        ) : (
          <Skeleton className={`w-full mt-4 h-[200px] ${bgNeutralColor2}`} />
        )}

        {/* <div>
        <h1 className={`text-lg font-semibold mt-8 mb-2 ${textPrimaryColor}`}>Pre-requisite</h1>
        {preRequisiteCourses.length > 0 ? preRequisiteCourses.map((course) => {
          return <Link href={`/course/${course.id}`}
            className="text-xs md:text-sm" key={course.id}>
            {course.title}
          </Link>
        }) :
          <p className="text-xs md:text-sm">None</p>}
      </div> */}

        {/* <div className="bg-white p-4 mt-8">
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
      </div> */}

        {/* <div className="mt-8">
     <EnrollButton courseId={course?.id} label={`${startedCourse ? "Go to class" : "Start for free"}`}/>
     </div> */}

        {/* {Array.isArray(comments) && comments.length > 0 && <div className="mt-4 border p-2 max-w-full">
        <h1 className={`text-lg font-semibold mt-8 mb-2 ${textPrimaryColor}`}>Reviews</h1>
        {comments.map((comment, index) => {

          return <CommentItem comment={comment} key={index} />
        })}
      </div>
      } */}
      </div>
    </div>
  );
}

export default CourseDetails;
