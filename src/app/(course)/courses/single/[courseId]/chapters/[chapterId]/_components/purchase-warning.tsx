
"use client"
import Banner from '@/components/banner'
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function PurchaseWarning({chapterId}:{chapterId:string}) {
    const [isChapterFree,setIsChapterFree] = useState<boolean | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/chapters/${chapterId}/is-locked`);
                    setIsChapterFree(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if(isChapterFree === undefined) return <Skeleton className='w-full h-10 my-2'/>
    if(!isChapterFree) return null;
  return (
    <Banner
    variant="warning"
    label="You have to purchase this course in order to take this chapter."
  />
  )
}

export default PurchaseWarning