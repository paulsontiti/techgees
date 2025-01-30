"use client"
import PriceForm from '@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/price-form';
import Banner from '@/components/banner';
import React, { useEffect, useState } from 'react'
import { DBUser } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';
import PaymentOption from '@/app/(auth)/payment/_component/payment-option';

 function CoursePaymentPage(
    { params: { courseId, chapterId } }: {
        params: { courseId: string, chapterId: string }
    }
) {
    const [user,setUser] = useState<DBUser | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/user`);
                    setUser(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);
 const redirectUrl = `/courses/single/${courseId}/chapters/${chapterId}`
    return (
        <PaymentOption courseId={courseId} redirectUrl={redirectUrl}>
        {user === undefined ? <Skeleton className='w-[350px] h-60 my-2'/> :  
       <PriceForm email={user.email} courseId={courseId} chapterId={chapterId}/>}
   </PaymentOption>
      
    )
}

export default CoursePaymentPage