"use client"
import Banner from '@/components/banner';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function VerifyPayment({reference,redirectUrl}
    :{reference?:string,redirectUrl:string}) {
        const [payment,setPayment] = useState<{amount:number,status:string} | undefined>(undefined);
  const router = useRouter();

useEffect(()=>{
    (
        async()=>{
            if(reference){
                try{
                    const res = await axios.get(`/api/paystack/payment/verify/${reference}`);
                    setPayment(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }finally{
                   setTimeout(()=>{
                     router.push(redirectUrl);
                   },5000);
                }
            }
        }
    )()
},[]);

if(reference === undefined) return null;
if(payment === undefined) return <Skeleton className='w-full h-10'/>
  return (
    <div>
       
        <Banner
          variant={payment?.status === "success" ? "success" : "warning"}
          label={`You payment of ${formatPrice(payment?.amount ?? 0)} is 
          ${payment?.status}`}
        />
    </div>
  )
}

export default VerifyPayment