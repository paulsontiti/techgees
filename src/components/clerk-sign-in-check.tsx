'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

export default function SignInForm() {
 const { isLoaded, signIn, setActive } = useSignIn();
 const [email, setEmail] = React.useState('');
 const [password, setPassword] = React.useState('');
 const [errors, setErrors] = React.useState<ClerkAPIError[]>();

 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setErrors(undefined);

   if (!isLoaded) {
     return;
   }

   try {
     const completeSignIn = await signIn.create({
       identifier: email,
       password,
     });

     if (completeSignIn.status === 'complete') {
       await setActive({ session: completeSignIn.createdSessionId });
       router.push('/');
     }
   } catch (err) {
     if (isClerkAPIResponseError(err)) setErrors(err.errors);
     console.error(JSON.stringify(err, null, 2));
   }
 };

 return (
   <>
     {/* Form JSX */}
     {errors && (
       <ul>
         {errors.map((el, index) => (
           <li key={index}>{el.longMessage}</li>
         ))}
       </ul>
     )}
   </>
 );
}