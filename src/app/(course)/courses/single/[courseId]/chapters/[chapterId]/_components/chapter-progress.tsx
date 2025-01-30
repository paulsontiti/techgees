
"use client"
import Banner from '@/components/banner'
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function ChapterProgress({chapterId}:{chapterId:string}) {
    const [chapterCompleted,setChapterCompleted] = useState<boolean | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/chapters/${chapterId}/completed`);
                    setChapterCompleted(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if(chapterCompleted === undefined) return <Skeleton className='w-full h-10'/>
    if(!chapterCompleted) return null;
  return (
    <Banner variant="success" label="You already completed this chapter." />
  )
}

export default ChapterProgress