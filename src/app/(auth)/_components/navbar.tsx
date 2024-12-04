
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'
import { bgPrimaryColor } from '@/utils/colors'
import { getUserCookie } from '@/lib/get-user-cookie'

async function Navbar() {
  const userId = await getUserCookie()
  return (
      <div className={` p-4 h-full flex items-center justify-center shadow-sm text-white ${bgPrimaryColor}`}>
   
        <MobileSidebar />
        <NavbarRoutes userId={userId ?? ""}/>
      </div>
  )
}

export default Navbar