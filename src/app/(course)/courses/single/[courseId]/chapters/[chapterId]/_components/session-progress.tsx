
"use client"
import Banner from '@/components/banner'
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function SessionProgress({sessionId,chapterId}:{sessionId:string,chapterId:string}) {
    const [sessionCompleted,setSessionCompleted] = useState<boolean | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/chapters/${chapterId}/sessions/${sessionId}/completed`);
                    setSessionCompleted(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if(sessionCompleted === undefined) return <Skeleton className='w-full h-10'/>
    if(!sessionCompleted) return null;
  return (
    <Banner variant="success" label="You already completed this session." />
  )
}

export default SessionProgress