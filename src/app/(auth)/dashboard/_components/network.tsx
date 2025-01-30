"use client"
import axios from 'axios';
import { NetworkIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import NetworkInfoCard from './report-card';

function Network() {
    const [network,setNetwork] = useState<number>(0);

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
    <NetworkInfoCard
                        icon={NetworkIcon}
                        label="Network"
                        numberOfItems={network}
                    />
  )
}

export default Network