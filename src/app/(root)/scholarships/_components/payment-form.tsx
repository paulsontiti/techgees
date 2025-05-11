"use client"
import React, { useEffect, useState } from 'react'
import { DBUser } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import axios from 'axios';
import PaymentOption from '@/app/(auth)/payment/_component/payment-option';
import ScholarshipPriceForm from './price-form';

 function ScholarshipPaymentForm({scholarshipId,price,terms}:
    {scholarshipId:string,price:number,terms:string}) {
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
    return (
    <PaymentOption scholarshipId={scholarshipId}>
         {user === undefined ? <Skeleton className='w-[350px] h-60 my-2'/> :  
        <ScholarshipPriceForm email={user.email || undefined} 
        terms={terms}
        scholarshipId={scholarshipId} price={price}/>}
    </PaymentOption>
       
    )
}

export default ScholarshipPaymentForm