"use client"
import WalletbalanceInfoCard from '@/components/wallet-balance-info-card';
import axios from 'axios';
import {Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function WalletBalance() {
    const [balance,setBalance] = useState<number | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get("/api/user/wallet/balance");
                    setBalance(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);
  return (
    <WalletbalanceInfoCard
                        icon={Wallet}
                        label="Wallet Balance"
                        balance={balance}
                    />
  )
}

export default WalletBalance