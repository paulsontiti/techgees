"use client"

import React, { useEffect, useState } from 'react'


import DashboardLink from '@/app/(root)/_components/dashboard-link';
import SignIn from '@/app/(root)/_components/sign-in-button';
import SignUp from '@/app/(root)/_components/sign-up-button';
import { Button } from './ui/button';
import { useCurrentUser } from '../../store/current-user-store';
import { getUserCookie } from '@/lib/get-user-cookie';
import { Skeleton } from './ui/skeleton';

function Account() {
  const {logout} = useCurrentUser();
  const [userId,setUserId] = useState<string | null>(null);

  useEffect(()=>{
    (
      async()=>{
        const userId = await getUserCookie();
        setUserId( userId ?? "");
      }
    )()
  })
if(userId === null) return <Skeleton className="h-10 w-[200px]"/>
  return (
    <div>
         {userId
           ? (
            <div className="flex items-center gap-x-4">
              <Button variant="outline" 
                onClick={logout}
              >Logout</Button>

              <DashboardLink />

            </div>
          ) : (
            <div className='flex gap-x-2'>
              <SignIn />
              <SignUp />
            </div>
          )}
    </div>
  )
}

export default Account