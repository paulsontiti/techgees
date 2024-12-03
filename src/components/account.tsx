"use client"

import React from 'react'


import DashboardLink from '@/app/(root)/_components/dashboard-link';
import SignIn from '@/app/(root)/_components/sign-in-button';
import SignUp from '@/app/(root)/_components/sign-up-button';
import { Button } from './ui/button';

function Account({userId}:{userId:string}) {
  return (
    <div>
         {userId
           ? (
            <div className="flex items-center gap-x-4">
              <Button variant="outline" 
                //onClick={logout}
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