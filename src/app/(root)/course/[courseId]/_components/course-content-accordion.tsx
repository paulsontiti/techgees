"use client";
import Link from "next/link";
import { bgNeutralColor, textPrimaryColor } from "@/utils/colors";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";


export  function CourseContentAccordion({
  courseId,courseTitle
}: {
  courseId:string,courseTitle:string
}) {

  const [chapterTitles,setChapterTitles] = useState<string[] | undefined>(undefined);
 
  useEffect(()=>{
    (
      async()=>{
       try{
        const res = await axios.get(`/api/courses/${courseId}/chapter-titles`);
        setChapterTitles(res.data);
       }catch(err){
        setChapterTitles([]);
       }
      }
    )()
  },[]);

  return (
 
    <Accordion
      type="single"
      collapsible
      className={`w-full my-2 bg-white ${textPrimaryColor}`}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-2">
        <Link href={`/course/${courseId}`}>{courseTitle}</Link>
        </AccordionTrigger>
        <AccordionContent>
         {chapterTitles !== undefined ?  <div>
           {chapterTitles?.map((title)=>(
            <div key={title} className={`${bgNeutralColor} p-2 m-2`}>{title}</div>
           ))}
          </div> : 
          <Skeleton className="w-11/12 h-10 m-2 p-2"/>
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
