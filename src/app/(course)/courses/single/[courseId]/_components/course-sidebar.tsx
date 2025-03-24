"use client"
import React, { useEffect, useState } from "react";
import CourseProgress from "@/components/course-progress";
import PaymentProgress from "@/components/paymentProgress";
import { CourseActioDropdownMenu } from "./action-dropdown-menu";
import Heading from "@/components/heading";
import { CourseChaptersUserProgressType } from "../../../../../../../actions/getCourseChaptersUserProgress";
import axios from "axios";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ChapterAndSessions } from "../../../components/chapter-sessions";
import { SingleCourseEnrollButton } from "./single-course-enroll-button";


export type CourseSidebarProps = {
  progressPercentage: number;
  purchasePercentage: number;
  paidPositions:number[],
  courseId:string
};

 function CourseSidebar({
  courseId
}: {courseId:string}) {
  
  const [course,setCourse] = useState<CourseChaptersUserProgressType | undefined>(undefined);
  const [coursePurchasePrice,setCoursePurchasePrice] = useState<number | undefined>(undefined);
  const [paidPositions,setPaidPosition] = useState<number[] | undefined>(undefined);
  const [progressPercentage,setProgressPercentage] = useState<number | undefined>(undefined);
  const [purchasePercentage,setPurchasePercentage] = useState<number | undefined>(undefined);



  useEffect(()=>{
    (
     async()=>{
      try{
          //fetch course
        const courseRes = await axios.get(`/api/courses/${courseId}/course-chapter-userprogress`);
        setCourse(courseRes.data)

           //fetch course price
           const coursePurchaseRes = await axios.get(`/api/courses/${courseId}/purchase/price`);
           setCoursePurchasePrice(coursePurchaseRes.data)

         //fetch course purchase percentage
         const purchaseRes = await axios.get(`/api/courses/${courseId}/purchase-percentage`);
         setPurchasePercentage(purchaseRes.data)

          //fetch course progress percentage
          const progressRes = await axios.get(`/api/courses/${courseId}/user-progress`);
          setProgressPercentage(progressRes.data)

          
          //fetch paid chapter positions
          const paidPositionsRes = await axios.get(`/api/courses/${courseId}/paid-chapters-positions`);
          setPaidPosition(paidPositionsRes.data)
      }catch(err:any){
        toast.error(err.message);
      }
     }
    )()
  },[]);


  return (
    <div className="h-full bg-white mt-4 px-4 border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="py-8 px-2 flex flex-col border-b">
        <div className="flex items-center justify-between mb-4">
         {course !== undefined ?  <Heading type={1} text={course.title} className="font-semibold"/> :
         <Skeleton className="w-full h-5"/>
         }
          
          <CourseActioDropdownMenu
            courseId={courseId}
          />
        </div>
        {
          course && purchasePercentage !== undefined && coursePurchasePrice !== undefined && paidPositions !== undefined
           ? 
          <PaymentProgress value={purchasePercentage} size="sm" paidChapters={paidPositions?.length ?? 0}
          amountPaid={(purchasePercentage / 100) * coursePurchasePrice}/>
          : <Skeleton className="w-full h-10"/>
          }

        {/* Payment button */}
       <div className="my-2">
       <SingleCourseEnrollButton courseId={courseId}/>
       </div>

        <div className="mt-10">
         {progressPercentage !== undefined ?  <CourseProgress variant="success" value={progressPercentage} /> :
         <Skeleton className="w-full h-10"/>
         }

        </div>
      </div>
     {
        course ? <>
         {course.chapters.map((chapter)=>(
            <ChapterAndSessions chapter={chapter} paidPositions={paidPositions || []} key={chapter.id}/>
        ))}</> : <Skeleton className="w-full h-[500px]"/>
       }
      
    </div>
  );
}

export default CourseSidebar;
