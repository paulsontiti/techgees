
"use client"
import Banner from '@/components/banner'
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function CourseCompletedProgress({courseId}:{courseId:string}) {
    const [courseCompleted,setCourseCompleted] = useState<boolean | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/courses/${courseId}/completed`);
                    setCourseCompleted(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if(courseCompleted === undefined) return <Skeleton className='w-full h-10'/>
    if(!courseCompleted) return null;
  return (
    <Banner variant="success" label="You already completed this course." />
  )
}

export default CourseCompletedProgress