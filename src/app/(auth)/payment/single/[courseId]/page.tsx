"use client"
import React, { useEffect, useState } from 'react'
import PriceForm from './_components/price-form';
import { DBUser } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import axios from 'axios';
import PaymentOption from '../../_component/payment-option';

 function CoursePaymentPage(
    { params: { courseId} }: {
        params: { courseId: string}
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

 const redirectUrl = `/courses/single/${courseId}`

    return (
        <PaymentOption courseId={courseId} redirectUrl={redirectUrl}>
        {user === undefined ? <Skeleton className='w-[350px] h-60 my-2'/> :  
      <PriceForm email={user.email || undefined} courseId={courseId}/>}
   </PaymentOption>
       
    )
}

export default CoursePaymentPage