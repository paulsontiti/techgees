"use client"
import CourseInfoCard from '@/components/course-info-card';
import axios from 'axios';
import { Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function CoursesCompletedInfoCard() {
    const [completed,setCompleted] = useState<number | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get("/api/courses/completed-count");
                    setCompleted(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);
  return (
    <CourseInfoCard
                        icon={Clock}
                        label="Completed"
                        numberOfItems={completed}
                    />
  )
}

export default CoursesCompletedInfoCard