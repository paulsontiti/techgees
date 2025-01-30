"use client"
import React, { useEffect, useState } from 'react'
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'
import { Skeleton } from '@/components/ui/skeleton'
import { bgNeutralColor2 } from '@/utils/colors'
import toast from 'react-hot-toast'
import axios from 'axios'
import CourseCard from '../../search/_components/course-card'


function CourseDetails() {
  const [courses,setCourses] = useState<SearchPageCourseType[] | undefined>(undefined);

  useEffect(()=>{
    (
      async()=>{
        try{
          const res = await axios.get("/api/courses/in-progress-and-completed");
          setCourses(res.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
  },[]);

  if(courses === undefined) return <Skeleton className={`${bgNeutralColor2} w-full h-44`}/>
  if(Array.isArray(courses) && courses.length === 0) return <div
      className='text-center text-sm text-muted-foreground mt-10'>
         You have not started or completed any course
      </div>
  return (
    <div className='grid gap-4 lg:grid-cols-2 max-w-full'>
      {courses.map((course) => {
       if(!course) return null;

        return <CourseCard
          key={course.id}
          course={course}
          progressPercentage={course.progressPercentage}
        
        />
      })}
    </div>
  )
}

export default CourseDetails