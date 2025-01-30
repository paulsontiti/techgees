
"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format';
import { textPrimaryColor } from '@/utils/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { GiTwoCoins } from "react-icons/gi";
import { WalletActionDropdownMenu } from './wallet-action-dropdown';

function WalletBalanceCard() {
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
    <div className='bg-white rounded-xl p-2'>
        <div className='flex items-center gap-x-8'>
            Total balance
            <GiTwoCoins className={`${textPrimaryColor} w-6 h-6`}/>
        </div>
        <div className='flex items-center justify-between mt-4'>
           {balance === undefined ? <Skeleton className='w-1/2 h-5'/> :  <strong>{formatPrice(balance)}</strong>}
           <WalletActionDropdownMenu/>
           
        </div>
    </div>
  )
}

export default WalletBalanceCard