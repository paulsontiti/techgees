'use client';

import { useUser } from '@clerk/nextjs';
import * as React from 'react';
import toast from 'react-hot-toast';


export default function SignInCheck() {
  const {isLoaded,isSignedIn} = useUser()

  React.useEffect(()=>{
if(isLoaded && !isSignedIn){
  toast.error("You are not signed in")
}
  },[isSignedIn])

 return (
   <>
    
   </>
 );
}