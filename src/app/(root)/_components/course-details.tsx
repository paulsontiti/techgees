"use client";

import PageLoader from "@/components/page-loader";
import { formatPrice } from "@/lib/format";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import StatInfo from "../course/[courseId]/_components/stat-info";
import { Button } from "@/components/ui/button";

type CourseDetailsCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  numberOfStudents: number;
  numberOfRatings: number;
  numberOfComments: number,
  likes: number;
  disLikes: number;
  rating: number;
  subTitle:string
};
function CourseDetailsCard({
  id,
  title,subTitle,
  imageUrl,
  price,
  numberOfRatings,
  numberOfStudents,
  numberOfComments,
  likes,
  disLikes,
  rating
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
            group hover:shadow-sm transition border 
            rounded-lg p-3 relative hover:cursor-pointer
            bg-white w-[350px]
        "
    >
      <PageLoader label="redirecting..." isloading={loading} />
      <div
        className="relative w-full aspect-video rounded-md overflow-hidden"
        
      >
        <Image fill src={imageUrl} className="object-cover" alt={title} />
      </div>
      <div className="flex flex-col pt-2 mt-4 gap-y-2">
        <div
          
        >
          <h1 className="text-lg md:text-base font-bold mb-2">{title}</h1>
          <p>{subTitle}</p>
        </div>
       

        {/* {isCombo ? (
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
          <div className=" flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1">
              <IconBadge size={"sm"} icon={BookOpen} />
              {chapterslength} {chapterslength > 1 ? "chapters" : "chapter"}
            </div>
          </div>
        )} */}

        <StatInfo
          numberOfComments={numberOfComments}
          numberOfRatings={numberOfRatings}
          numberOfStudents={numberOfStudents}
          likes={likes}
          disLikes={disLikes}
          rating={rating}
        />
      
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm"> {formatPrice(price)}</Button>
            <Button size="sm" onClick={onClick}>View more</Button>
          </div>


      </div>
    </div>
  );
}

export default CourseDetailsCard;
