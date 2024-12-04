"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { useCurrentUser } from '../../../../store/current-user-store';




function LogoutButton() {
    const {logout} = useCurrentUser();
  return (
    <div className="flex items-center gap-x-4">
    <Button
      onClick={logout}
    >Logout</Button>

  </div>
  )
}

export default LogoutButton