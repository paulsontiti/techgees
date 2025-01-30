"use client"
import React, { useEffect, useState } from 'react'
import { DBUser } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import axios from 'axios';
import ComboPriceForm from './_components/price-form';
import PaymentOption from '../../_component/payment-option';

 function CoursePaymentPage(
    { params: { courseId} }: {
        params: { courseId: string}
    }
) {
     const [user,setUser] = useState<DBUser | undefined>(undefined);
 const redirectUrl = `/courses/combo/${courseId}`
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
    return (
    <PaymentOption courseId={courseId} redirectUrl={redirectUrl}>
         {user === undefined ? <Skeleton className='w-[350px] h-60 my-2'/> :  
        <ComboPriceForm email={user.email || undefined} 
        redirectUrl={redirectUrl}
        courseId={courseId}/>}
    </PaymentOption>
       
    )
}

export default CoursePaymentPage