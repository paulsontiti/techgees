"use client";

import IconBadge from "@/components/icon-badge";
import PageLoader from "@/components/page-loader";
import { formatPrice } from "@/lib/format";
import { Category, ComboCourses, Course, PreRequisiteCourses } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import StatInfo from "../course/[courseId]/_components/stat-info";

type CourseDetailsCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  chapterslength: number;
  price: number;
  preRequisiteCourses: Course[];
  childrenCourses: Course[];
  isCombo: boolean;
  numberOfStudents: number;
  numberOfRatings: number;
  numberOfComments: number,
  likes: number;
  disLikes: number;
  description?: string;
  rating: number;
};
function CourseDetailsCard({
  id,
  title,
  imageUrl,
  chapterslength,
  price,
  isCombo,
  preRequisiteCourses,
  childrenCourses,
  numberOfRatings,
  numberOfStudents,
  numberOfComments,
  likes,
  disLikes,
  rating,
}: CourseDetailsCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = () => {
    setLoading(true);
    router.push(`/course/${id}`);
  };
  return (
    <div
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-3 relative hover:cursor-pointer
            bg-white min-h-[500px] max-h-[500px] w-[300px]
        "
    >
      <PageLoader label="redirecting..." isloading={loading} />
      <div
        className="relative w-full aspect-video rounded-md overflow-hidden"
        onClick={onClick}
      >
        <Image fill src={imageUrl} className="object-cover" alt={title} />
      </div>
      <div className="flex flex-col pt-2">
        <div
          className="text-lg md:text-base font-medium 
                group-hover:text-sky-700 transition line-clamp-2"
        >
          {title}
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
              {chapterslength} {chapterslength > 1 ? "chapters" : "chapter"}
            </div>
          </div>
        )}

   <StatInfo
   numberOfComments={numberOfComments}
   numberOfRatings={numberOfRatings}
   numberOfStudents={numberOfStudents}
   likes={likes}
   disLikes={disLikes}
   rating={rating}
   />
          <p
            className="text-md md:text-sm  mt-8 font-bold
           text-slate-700"
          >
            {formatPrice(price)}
          </p>
       

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

    
      </div>
    </div>
  );
}

export default CourseDetailsCard;
