"use client"
import CourseInfoCard from '@/components/course-info-card';
import axios from 'axios';
import { Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function CoursesInProgressInfoCard() {
    const [inProgress,setInProgress] = useState<number | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get("/api/courses/in-progress-count");
                    setInProgress(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);
  return (
    <CourseInfoCard
                        icon={Clock}
                        label="In Progress"
                        numberOfItems={inProgress}
                    />
  )
}

export default CoursesInProgressInfoCard