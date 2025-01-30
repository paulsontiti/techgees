"use client"
import Banner from '@/components/banner';
import React, { ReactNode, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Wallet } from 'lucide-react';
import { textPrimaryColor } from '@/utils/colors';
import PaystackIcon from '@/components/paystack-icon';
import WalletPaymentForm from './wallet-payment-form';


function PaymentOption({children,courseId,redirectUrl}:
    {children:ReactNode,courseId:string,redirectUrl:string}) {
   
    const [paystack,setPaystack] = useState(false);
    const [wallet,setWallet] = useState(false);


  return (
    <div  className='flex flex-col gap-4 items-center justify-center'>
    <DropdownMenu>
<DropdownMenuTrigger asChild>
  <Button className="flex items-center gap-4">Select payment option <ChevronDown className="w-4 h-4"/></Button>
</DropdownMenuTrigger>
<DropdownMenuContent className="w-40">
  <DropdownMenuLabel>Select payment option</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuGroup className="flex flex-col gap-2">
    <DropdownMenuItem onClick={()=>{
    setWallet(true);
    setPaystack(false);
    }}>
      Pay from wallet
      <DropdownMenuShortcut><Wallet className={`w-4 h-4 ${textPrimaryColor}`}/></DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={()=>{
    setPaystack(true);
    setWallet(false);
    }}>
      Pay with Paystack
      <DropdownMenuShortcut><PaystackIcon/></DropdownMenuShortcut>
    </DropdownMenuItem>
          
  </DropdownMenuGroup>

</DropdownMenuContent>
</DropdownMenu>
{wallet && <WalletPaymentForm courseId={courseId} redirecturl={redirectUrl}/>}
      {paystack &&  <div className='mx-2 flex items-center justify-center flex-col gap-4'>
      <Banner label='Please close the Paystack browser window after payment. This to enable redirection to the course page'
      />
    {children}      
  </div>
}
</div>
  )
}

export default PaymentOption