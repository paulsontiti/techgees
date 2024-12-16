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
    router.push(`/course/${course.id}`);
  };
  return (
    <div
    onClick={onClick}
 
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-2 md:p-8 relative hover:cursor-pointer
             bg-white w-full min-h-[450px]
        "
        
    >
      <PageLoader label="redirecting..." isloading={loading} />
      <div
        className="relative w-full aspect-video rounded-md overflow-hidden"
      
      >
        <Image fill src={course.imageUrl ?? ""} className="object-cover" alt={course.title} />
      </div>
      <div className="flex flex-col pt-2 ">
        <div
          className="text-lg md:text-base font-medium 
                group-hover:text-sky-700 transition"
        >
         <h1 className="my-2 text-xl font-bold"> {course.title}</h1>
         <p>{course.subTitle?.slice(0,100)}{course.subTitle && course.subTitle?.length > 100 ? "..." : ""}</p>
        </div>
      

       
      </div>
       <footer className="my-4 absolute bottom-0">
        <Button>Start for free</Button>
       </footer>
    </div>
  );
}

export default FreeCourseCard;
