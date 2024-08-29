"use client";


import IconBadge from "@/components/icon-badge";
import PageLoader from "@/components/page-loader";
import { formatPrice } from "@/lib/format";
import { Course } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type CourseCardProps = {
course:Course
chapterLength: number
};
function CourseCard({
course,chapterLength
}: CourseCardProps) {
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const onClick = ()=>{
        setLoading(true)
        router.push(`/courses/${course.id}`)
    }
    if(!course) return null
  return (
    <div
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-3 relative hover:cursor-pointer
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
       
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1">
            <IconBadge size={"sm"} icon={BookOpen} />
            {chapterLength} {chapterLength > 1 ? "chapters" : "chapter"}
          </div>
        </div>
        
       <p>{formatPrice(course.price ?? 0)}</p>
      </div>
    </div>
  );
}

export default CourseCard;
