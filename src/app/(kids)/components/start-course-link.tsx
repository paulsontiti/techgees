"use client";
import LoadingComponent from "@/components/loading-component";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function StartCourseLink({ moduleTitle }: { moduleTitle: string }) {
  const [courseId, setCourseId] = useState<string | undefined>(undefined);

  const getCourseId = async (title: string) => {
    try {
      const res = await axios.get(`/api/courses/module/${title}`);
      setCourseId(res.data);
    } catch (err: any) {}
  };
  useEffect(() => {
    getCourseId(moduleTitle);
  }, [moduleTitle]);
  if(courseId === undefined) return <LoadingComponent/>
  if(courseId === "") return <div className="mt-4 grid h-11 w-full md:w-1/2 shrink-0 place-items-center rounded-2xl bg-[#07152f] text-sm font-black text-[#ffd429]">Not yet available</div>
  return (
      <Link href={`/courses/single/${courseId}`} className="mt-4 grid h-11 w-full md:w-1/2 shrink-0 place-items-center rounded-2xl bg-[#07152f] text-sm font-black text-[#ffd429]">Start for free</Link>
  );
}

export default StartCourseLink;
