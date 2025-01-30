"use client";


import CourseProgress from "@/components/course-progress";
import PageLoader from "@/components/page-loader";
import { formatPrice } from "@/lib/format";
import { Course } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommentForm from "@/app/(course)/courses/single/[courseId]/_components/comment-form";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

type CourseCardProps = {
  course: Course,
  parentId: string,
  numberOfPaidChapters: number,
};
function CourseCard({
  course, numberOfPaidChapters,
  parentId

}: CourseCardProps) {

  const [progressPercentage,setProgressPercentage] = useState<number | undefined>(undefined);
  const [numberOfChapters,setNumberOfChapters] = useState<number | undefined>(undefined);
  const [numberOfFreeChapters,setNumberOfFreeChapters] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [commenting, setCommenting] = useState(false)
  const router = useRouter();

  useEffect(()=>{
    (
      async()=>{
        try{
          const chapRes = await axios.get(`/api/courses/${course.id}/number-of-chapters`);
          setNumberOfChapters(chapRes.data);

          const freeChapRes = await axios.get(`/api/courses/${course.id}/number-of-free-chapters`);
          setNumberOfFreeChapters(freeChapRes.data);

          const progressRes = await axios.get(`/api/courses/${course.id}/progress-percentage`);
          setProgressPercentage(progressRes.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
  },[]);
 if (!course) return null
  if(numberOfChapters === undefined || numberOfFreeChapters === undefined) 
    return <Skeleton className="w-full h-72 m-2"/>
  
  
  const onClick = () => {
    if (numberOfFreeChapters > 0 || numberOfPaidChapters > 0) {
      setLoading(true);
      router.push(`/courses/combo/${parentId}/child/${course.id}`);
    } else {
      toast.error("You have no paid chapter in the course", { duration: 5000 })
    }

  };
  return (
    <div
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-3 h-full relative hover:cursor-pointer
            w-full bg-white
        "
    >
      <PageLoader
        className="text-sky-500"
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

        <div className="my-4 text-xs flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <BookOpen className="h-4 w-4 text-sky-500" />
            {`${numberOfChapters} ${numberOfChapters > 1 ? "chapters" : "chapter"}`}
          </div>
          <div className="flex items-center gap-x-2">
            <BookOpen className="h-4 w-4 text-sky-500" />
            {`${numberOfFreeChapters} ${numberOfFreeChapters > 1 ? "free chapters" : "free chapter"}`}
          </div>
          <div className="flex items-center gap-x-2">
            <BookOpen className="h-4 w-4 text-sky-500" />
            {`${numberOfPaidChapters} ${numberOfPaidChapters > 1 ? "chapters" : "chapter"} paid for`}
          </div>
        </div>

       {
        progressPercentage === undefined ? <Skeleton className="w-full h-10"/> : 
          <CourseProgress
            value={progressPercentage}
            variant={progressPercentage === 100 ? "success" : "default"}
            size="sm"
          />
       }




        <span
          className="mt-4 text-sm"
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
