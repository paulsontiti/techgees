"use client"

import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Username({userId}:{userId:string}) {
    const [userName,setUserName] = useState<string | undefined>(undefined)

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/user/${userId}/user-name`);
                    setUserName(res.data);
                }catch(err:any){
                    toast.error(err.message,{duration:3000});
                }
            }
        )()
    },[]);

    if(userName === undefined) return <Skeleton className='w-40 h-10 my-2'/>
  return (
    <div>{userName}</div>
  )
}

export default Username