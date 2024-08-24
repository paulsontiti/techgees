"use client";

import CourseProgress from "@/components/course-progress";
import IconBadge from "@/components/icon-badge";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { Category } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type CourseCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  chapterslength: number;
  price: number;
  progressPercentage?: number | null;
  categories: Category[];
};
function CourseCard({
  id,
  title,
  imageUrl,
  chapterslength,
  price,
  progressPercentage,
  categories,
}: CourseCardProps) {
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const onClick = ()=>{
        setLoading(true)
        router.push(`/courses/${id}`)
    }
  return (
    <div
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-3 h-full relative hover:cursor-pointer
        "
        onClick={onClick}
    >
        <PageLoader label="redirecting..." isloading={loading}/>
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill src={imageUrl} className="object-cover" alt={title} />
      </div>
      <div className="flex flex-col pt-2">
        <div
          className="text-lg md:text-base font-medium 
                group-hover:text-sky-700 transition line-clamp-2"
        >
          {title}
        </div>
        <div>
          {Array.isArray(categories) &&
            categories.map((category) => {
              return (
                <span key={category.id} className="text-xs mr-2">
                  {category.name}
                </span>
              );
            })}
        </div>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1">
            <IconBadge size={"sm"} icon={BookOpen} />
            {chapterslength} {chapterslength > 1 ? "chapters" : "chapter"}
          </div>
        </div>
        
        {progressPercentage === null ? (
          <p className="text-md md:text-sm font-medium
           text-slate-700">{formatPrice(price)}</p>
        ) : (
         <CourseProgress
          value={progressPercentage ?? 0}
          variant={progressPercentage === 100 ? "success" : "default"}
          size="sm"
         />
        )}
      </div>
    </div>
  );
}

export default CourseCard;
