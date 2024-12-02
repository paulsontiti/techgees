
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'
import { auth } from '@clerk/nextjs/server'
import { bgPrimaryColor } from '@/utils/colors'

function Navbar() {
  const {userId} = auth()
  return (
      <div className={` p-4 h-full flex items-center justify-center shadow-sm text-white ${bgPrimaryColor}`}>
   
        <MobileSidebar />
        <NavbarRoutes userId={userId ?? ""}/>
      </div>
  )
}

export default Navbar