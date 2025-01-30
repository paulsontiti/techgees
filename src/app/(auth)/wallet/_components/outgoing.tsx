"use client"

import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice } from '@/lib/format'
import { textPrimaryColor } from '@/utils/colors'
import axios from 'axios'
import { ArrowUpRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function Outgoing() {
    const [income,setIncome] = useState<number | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get("/api/user/wallet/withdrawals");
                    setIncome(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);
  return (
    <div className='bg-white rounded-xl p-4'>
         <div className='flex items-center gap-x-8'>
            Outgoings
            <ArrowUpRight className={`${textPrimaryColor} w-6 h-6`}/>
        </div>
        <div className='flex items-center justify-between mt-4'>
        {income === undefined ? <Skeleton className={`w-1/2 h-5`}/>  : 
        <strong>{formatPrice(income)}</strong>}
           
        </div>
    </div>
  )
}

export default Outgoing