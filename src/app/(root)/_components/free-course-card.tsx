"use client";



import IconBadge from "@/components/icon-badge";
import PageLoader from "@/components/page-loader";
import { Category,Course } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RecommendedCourseType } from "../../../../actions/getRecommendedCourses";

type FreeCourseCardProps = {
course:RecommendedCourseType,
  categories: Category[];
  childrenCourses: Course[];
  isCombo: boolean;
};
function FreeCourseCard({
course,
  isCombo,
  categories,
  childrenCourses,
}: FreeCourseCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if(!course) return null
  const onClick = () => {
    setLoading(true);
    router.push(`/courses/${course.id}`);
  };
  return (
    <div
    onClick={onClick}
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-3 h-full relative hover:cursor-pointer
            w-full
        "
    >
      <PageLoader label="redirecting..." isloading={loading} />
      <div
        className="relative w-full aspect-video rounded-md overflow-hidden"
      
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
       
      </div>
    </div>
  );
}

export default FreeCourseCard;
