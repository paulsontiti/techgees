"use client"

import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Points({participantId}:{participantId:string}) {
    const [points,setPoints] = useState<number | undefined>(undefined)
    const [courseId,setCourseId] = useState("");
    const [userId,setUserId] = useState("");

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/challenges/participants/${participantId}`);
                    //res.data returns a challenge participant
                   
                   
                    if(res.data.challenge.courseId && res.data.userId){
                        const resPoints = await axios.get(`/api/courses/${res.data.challenge.courseId}/points/${res.data.userId}`);
                        setPoints(resPoints.data);
                    }
                   

                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);


   

    if(points === undefined) return <Skeleton className='w-40 h-10 my-2'/>
  return (
    <div className='flex items-center justify-center'>{points}</div>
  )
}

export default Points