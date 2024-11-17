"use client";


import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { Course } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type CourseCardProps = {
course:Course
};
function HomePageCourseCard({
course
}: CourseCardProps) {
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const onClick = ()=>{
        setLoading(true)
        router.push(`/course/${course.id}`)
    }
    if(!course) return null
  return (
    <div
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-3 relative hover:cursor-pointer w-full md:w-[300px]
            bg-white
        "
        onClick={onClick}
    >
        <PageLoader label="redirecting..." isloading={loading}/>
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill src={course.imageUrl ?? ""} className="object-cover" alt={course.title} />
      </div>
      <div className="flex flex-col pt-2">
        <div
          className="text-lg md:text-base font-medium 
                group-hover:text-sky-700 transition line-clamp-2"
        >
          {course.title}
         
        </div>
       
   
        
  <div className="flex items-center justify-center gap-x-2 mt-8">
  <Button
       variant="outline"
       >{formatPrice(course.price ?? 0)}</Button>
            <Button
       >Learn more</Button>
  </div>
      </div>
    </div>
  );
}

export default HomePageCourseCard;
