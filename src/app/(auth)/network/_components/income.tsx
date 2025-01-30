"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format'
import { bgNeutralColor2, textPrimaryColor } from '@/utils/colors';
import axios from 'axios';
import { HandCoins } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Income() {
    const [income,setIncome] = useState<number | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get("/api/user/earnings");
                    setIncome(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);
  return (
    <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center gap-x-4'>
                        Total Earnings
                        <HandCoins className={`w-5 h-5 ${textPrimaryColor}`} />

                    </div>
                    {income === undefined ? <Skeleton className={`w-20 h-5 ${bgNeutralColor2}`}/>  : <strong>{formatPrice(income)}</strong>}
                </div>
   
  )
}

export default Income