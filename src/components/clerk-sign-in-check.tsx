'use client';

import { useUser } from '@clerk/nextjs';
import * as React from 'react';
import toast from 'react-hot-toast';


export default function SignInCheck() {
  const {isLoaded,user} = useUser()

  React.useEffect(()=>{
if(isLoaded && !user){
  toast.error("You are not signed in")
}
  },[user,isLoaded])

 return (
   <>
    
   </>
 );
}