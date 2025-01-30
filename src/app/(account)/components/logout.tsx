"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { useCurrentUser } from '../../../../store/current-user-store';
import { textPrimaryColor } from '@/utils/colors';
import { LogOut } from 'lucide-react';




function LogoutButton() {
    const {logout} = useCurrentUser();
  return (
    <div className="flex items-center">
      <LogOut className='w-4 h-4'/>
    <Button variant={"link"}
      onClick={logout}
      className={`${textPrimaryColor}`}
    >Logout</Button>

  </div>
  )
}

export default LogoutButton