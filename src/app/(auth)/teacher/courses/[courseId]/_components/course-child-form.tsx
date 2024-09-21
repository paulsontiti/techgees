"use client";
import { Button } from "@/components/ui/button";



import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import toast from "react-hot-toast";



import { Course, CourseChild } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import PageLoader from "@/components/page-loader";
import CourseChildrenForm from "./children-courses-form";
import CourseChildrenList from "./course-children-list";

export type CourseChildFormType =
  Course & {course:(CourseChild & {childCourse:Course})[]}


function CourseChildForm({ courseChildren,courses,courseId }:
   { courseChildren: Course[],
  courses:Course[],courseId:string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  if(!courseId) return null



  const toggleCreating = () => {
    setIsCreating((prv) => !prv);
  };



  const onReorder = async (
    reorderedCourseChildren:{courseChildId:string,position:number}[]
  )=>{
    try{
      setIsUpdating(true)

      await axios.put(`/api/courses/${courseId}/chapters/reorder`,{
        reorderedCourseChildren
      })

      toast.success("Chapters reordered")
      router.refresh()
    }catch(err:any){
      toast.error("Something went wrong",err.message)
    }finally{
      setIsUpdating(false)
    }
  }

  const onEdit = (chapterId:string)=>{
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`)
  }

  return ( 
    <div
      className="mt-6 relative
    border bg-slate-100 rounded-md p-4"
    >
      <PageLoader isloading={isUpdating} label="re-odering chapters..."/>
      <div className="font-medium flex items-center justify-between">
        Course children
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a child course
            </>
          )}
        </Button>
      </div>

      {isCreating && (
       <CourseChildrenForm courses={courses} parentId={courseId}/>
      ) }
      {!isCreating && (
       <div>
             <div className={cn(
                "text-sm mt-2",
                !courseChildren.length && "text-slate-500 italic"
             )}>{!courseChildren.length && "No children"}
            
            <CourseChildrenList
              onEdit={onEdit}
              onReorder={onReorder}
              items={courseChildren ?? []}
            />
             </div>
             <p className="text-xs text-muted-foreground mt-4">
                Drag and drop to reorder the courses
             </p>

       </div>
      )}
    </div>
  );
}

export default CourseChildForm;
