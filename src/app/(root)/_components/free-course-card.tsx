"use client";

import PageLoader from "@/components/page-loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";

type FreeCourseCardProps = {
course:Course,
};
function FreeCourseCard({
course
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
            rounded-lg p-3 min-h-[450px] relative hover:cursor-pointer
            min-w-[300px] md:w-[350px] lg:[400px] bg-white
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
                group-hover:text-sky-700 transition"
        >
         <h1 className="my-2 text-xl font-bold"> {course.title}</h1>
         <p>{course.subTitle}</p>
        </div>
      

       <footer className="my-4 absolute bottom-0">
        <Button>Start for free</Button>
       </footer>
       
      </div>
    </div>
  );
}

export default FreeCourseCard;
