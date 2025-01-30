"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton';
import Separator from '../separator';

export type CourseChaptersAndSessionsDetailsType = {
    chaptersLength:number,
    sessionsLength:number,
    duration:number
}

function CourseChaptersAndSessionsDetails({courseId}:{courseId:string}) {
    const [details,setDetails] = useState<CourseChaptersAndSessionsDetailsType | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                const res = await axios.get(`/api/courses/${courseId}/chapters-sessions-details`);
                setDetails(res.data);
            }
        )()
    },[]);
   
    const calculateDurationInHours = (duration:number)=>{
        switch(true){
           default:{
                return `${duration} mins`;
                
            }
            case duration > 60:{
                return `${Math.floor(duration/60)} hrs and ${duration % 60} mins`
            }

        }
    }
    if(details === undefined) return <Skeleton className='w-full h-10 my-2'/>
  return (
    <div className='flex gap-4 bg-white p-2'>
        <span>{details?.chaptersLength} {details?.chaptersLength > 1 ? "chapters" : "chapter"}</span>
        <Separator heigth='h-4'/>
        <span>{details?.sessionsLength} {details?.sessionsLength > 1 ? "sessions" : "session"}</span>
        <Separator heigth='h-4'/>
        <span>{calculateDurationInHours(details.duration)}</span>
    </div>
  )
}

export default CourseChaptersAndSessionsDetails