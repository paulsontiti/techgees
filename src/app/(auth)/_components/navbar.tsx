
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'
import { bgPrimaryColor } from '@/utils/colors'

 function Navbar() {

  return (
      <div className={` p-4 h-full flex items-center w-full shadow-sm text-white ${bgPrimaryColor}`}>
   
        <MobileSidebar />
        <NavbarRoutes />
      </div>
  )
}

export default Navbar