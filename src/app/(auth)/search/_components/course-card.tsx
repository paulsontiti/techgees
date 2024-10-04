"use client";


import CourseProgress from "@/components/course-progress";

import IconBadge from "@/components/icon-badge";
import PageLoader from "@/components/page-loader";
import { formatPrice } from "@/lib/format";
import { Category, Course } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RecommendedCourseType } from "../../../../../actions/getRecommendedCourses";
import CommentForm from "@/app/(course)/courses/single/[courseId]/_components/comment-form";

type CourseCardProps = {
  course: RecommendedCourseType,
  progressPercentage?: number | null;
  categories: Category[];
  recommendedCourses: Course[];
  preRequisiteCourses: Course[];
  childrenCourses: Course[];
  isCombo: boolean;
};
function CourseCard({
  course,
  progressPercentage,
  isCombo,
  categories,
  preRequisiteCourses,
  childrenCourses,
  recommendedCourses,
}: CourseCardProps) {
  const [loading, setLoading] = useState(false);
  const [commenting, setCommenting] = useState(false)
  const router = useRouter();

  if (!course) return null
  const onClick = () => {
    setLoading(true);
    router.push(`/courses/${course.id}`);
  };
  return (
    <div
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-3 h-full relative hover:cursor-pointer
            md:w-full
        "
    >
      <PageLoader
        className="text-black"
        label="redirecting..." isloading={loading} />
      <div
        className="relative w-full aspect-video rounded-md overflow-hidden"
        onClick={onClick}
      >
        <Image fill src={course.imageUrl ?? ""} className="object-cover" alt={course.title} />
      </div>
      <div className="flex flex-col pt-2">
        <div
          className="text-lg md:text-base font-medium 
                group-hover:text-sky-700 transition line-clamp-2"
        >
          {course.title}
        </div>
        <div>
          <h2
            className="text-md md:text-sm italic mt-2 
                group-hover:text-sky-700 transition line-clamp-2 font-medium"
          >
            Categories:
          </h2>
          <div className="flex flex-wrap">
            {Array.isArray(categories) &&
              categories.map((category) => {
                return (
                  <span
                    key={category.id}
                    className="text-xs mr-2 italic bg-sky-100 rounded-full mt-4 py-1 px-2"
                  >
                    {category.name}
                  </span>
                );
              })}
          </div>
        </div>

        {isCombo ? (
          <div>
            {Array.isArray(childrenCourses) && childrenCourses.length > 0 && (
              <div>
                <h2
                  className="text-md md:text-sm italic mt-2 
                group-hover:text-sky-700 transition line-clamp-2 font-semibold"
                >
                  Courses:
                </h2>
                <div className="flex flex-wrap">
                  {childrenCourses.map((course) => {
                    return (
                      <span
                        key={course.id}
                        className="text-xs mr-2 italic p-2 bg-sky-100 rounded-full mt-4 py-1 px-2"
                      >
                        {course.title}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1">
              <IconBadge size={"sm"} icon={BookOpen} />
              {course.chapters.length} {course.chapters.length > 1 ? "chapters" : "chapter"}
            </div>
          </div>
        )}

        {progressPercentage === null ? (
          <p
            className="text-md md:text-sm  mt-8 font-bold
           text-slate-700"
          >
            {formatPrice(course.price!)}
          </p>
        ) : (
          <CourseProgress
            value={progressPercentage ?? 0}
            variant={progressPercentage === 100 ? "success" : "default"}
            size="sm"
          />
        )}

        {Array.isArray(preRequisiteCourses) &&
          preRequisiteCourses.length > 0 && (
            <div>
              <h2
                className="text-md md:text-sm italic mt-2 
                group-hover:text-sky-700 transition line-clamp-2"
              >
                Pre-requisites:
              </h2>
              <div className="flex flex-wrap">
                {preRequisiteCourses.map((course) => {
                  return (
                    <span
                      key={course.id}
                      className="text-xs mr-2 italic bg-sky-100 rounded-full mt-4 py-1 px-2"
                    >
                      {course.title}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

        {Array.isArray(recommendedCourses) && recommendedCourses.length > 0 && (
          <div>
            <h2
              className="text-md md:text-sm italic mt-2 
                group-hover:text-sky-700 transition line-clamp-2"
            >
              Recommended courses:
            </h2>
            <div className="flex flex-wrap">
              {recommendedCourses.map((course) => {
                return (
                  <span
                    key={course.id}
                    className="text-xs mr-2 italic bg-sky-100 rounded-full mt-4 py-1 px-2"
                  >
                    {course.title}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        <span
          className="mt-4"
          onClick={() => {
            setCommenting((val) => !val)
          }}>
          Add a comment
        </span>
        {commenting && <CommentForm courseId={course.id} />}
      </div>
    </div>
  );
}

export default CourseCard;
