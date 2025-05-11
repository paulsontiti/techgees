"use client";


import IconBadge from "@/components/icon-badge";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { Course, Scholarship } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


function ScholarshipCard({
scholarship
}: {scholarship:Scholarship}) {
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const onClick = ()=>{
        setLoading(true)
        router.push(`/scholarships/${scholarship.id}`)
    }

    
  return (
    <div
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg relative hover:cursor-pointer
        "
        onClick={onClick}
    >
        <PageLoader label="redirecting..." isloading={loading}/>
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill src={scholarship.imageUrl ?? ""} className="object-cover" alt={scholarship.title} />
      </div>
      <div className="flex flex-col pt-2">
        <div
          className="text-lg md:text-base font-medium 
                group-hover:text-sky-700 transition line-clamp-2"
        >
          {scholarship.title}
        </div>
       
     
      </div>
      <footer className="my-2">
        <Button size="sm">Learn more</Button>
      </footer>
    </div>
  );
}

export default ScholarshipCard;
