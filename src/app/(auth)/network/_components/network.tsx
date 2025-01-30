"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { bgNeutralColor2, textPrimaryColor } from '@/utils/colors'
import axios from 'axios';
import { Network } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function NetworkComponent() {
    const [network,setNetwork] = useState<number>(0);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        (
            async function getReferees(userId:string){
                try{
                    if(!userId){
                        const res = await axios.get(`/api/user/userId`);
                        userId = res.data;
                    }
                   
                    const res = await axios.post(`/api/user/network/${userId}`);
                    const referees = res.data && res.data.referees;
                    const len = referees ? referees.length : 0;
                    setNetwork(prv => prv + len);
                    
                    setLoading(len > 0);
                    if(Array.isArray(referees) && len > 0){
                        referees.map((referee)=>{
                            getReferees(referee.userId);
                        })
                    }
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )("")
        
    },[]);
  
  return (
     <div className='flex flex-col items-center justify-center'>
                       <div className='flex gap-x-4'>
                           Network
                           <Network className={`w-5 h-5 ${textPrimaryColor}`} />
                       </div>
                       {loading ? <Skeleton className={`w-20 h-5 ${bgNeutralColor2}`}/>:
                       <strong>{network}</strong>
  }
                   </div>
  )
}

export default NetworkComponent