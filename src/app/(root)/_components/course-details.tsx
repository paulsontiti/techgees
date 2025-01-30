"use client";

import PageLoader from "@/components/page-loader";
import { formatPrice } from "@/lib/format";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import StatInfo from "../course/[courseId]/_components/course-stat-info";
import { Button } from "@/components/ui/button";

type CourseDetailsCardProps = {
  courseId: string;
  title: string;
  imageUrl: string;
  price: number;
  subTitle:string
};
function CourseDetailsCard({
  courseId,
  title,subTitle,
  imageUrl,
  price,
}: CourseDetailsCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = () => {
    setLoading(true);
    router.push(`/course/${courseId}`);
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
      

        <StatInfo
         courseId={courseId}
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
