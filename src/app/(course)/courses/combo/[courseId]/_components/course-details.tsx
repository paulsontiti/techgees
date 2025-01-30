"use client"
import React, { useEffect, useState } from 'react'
import CourseCard from './course-card'
import { Course } from '@prisma/client'
import { PaidChapterType } from '../../../../../../../actions/getPaidChapters'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import toast from 'react-hot-toast'


 function CourseDetails(
  { courses, parentId }:
    {
      courses: Course[], parentId: string
    }
) {

  const [paidChapters,setPaidChapters] = useState<PaidChapterType[] | undefined>(undefined);

  useEffect(()=>{
    (
      async()=>{
        try{
          const res = await axios.get(`/api/courses/${parentId}/paid-chapters`);
          setPaidChapters(res.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
  },[]);


  if(paidChapters === undefined) return <Skeleton className='w-full h-20 my-2'/>
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {courses.map( (course) => {
        // if (!course) return null

        // const courseId = course.id

        // const { progressPercentage, error } = await getCourseProgress(userId, courseId)
        // if (error) return <ErrorPage key={index} name={error.name} />

        //get number of paid chapters
        const chapter = paidChapters.find((chapter) => chapter.courseId === course.id);
        const numberOfPaidChapters = chapter?.numberOfChapter ?? 0;


        // //get number of chapters
        // const { numberOfChapters, error: chapNumError } = await getCourseNumberOfChapters(courseId)
        // if (chapNumError) return <ErrorPage key={index} name={chapNumError.name} />;

        // //get number of free chapters
        // const { numberOfFreeChapters, error: freeChapError } = await getCourseNumberOfFreeChapters(courseId)
        // if (freeChapError) return <ErrorPage key={index} name={freeChapError.name} />;

        return <CourseCard
          key={course.id}
          course={course}
          parentId={parentId}
          numberOfPaidChapters={numberOfPaidChapters}

        />
      })}
    </div>
  )
}

export default CourseDetails