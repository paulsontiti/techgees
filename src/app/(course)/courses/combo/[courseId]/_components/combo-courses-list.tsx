"use client"
import React, { useEffect, useState } from 'react'
import CourseDetails from './course-details'
import { Course } from '@prisma/client'
import { Skeleton } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'
import axios from 'axios'


 function CoursesList({ courseId }: { courseId: string}) {

  const [courseChildren,setCourseChildren] = useState<Course[] | undefined>(undefined);
 
  useEffect(()=>{
    (
      async()=>{
        try{
          const res = await axios.get(`/api/courses/${courseId}/course-children`);
          setCourseChildren(res.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
  },[]);

  if(courseChildren === undefined) return <Skeleton className='w-full h-[600px] my-2'/>
  return (
    <div className='w-full'>
      <CourseDetails courses={courseChildren} parentId={courseId}/>
    </div>
  )
}

export default CoursesList