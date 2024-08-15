import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'

function Navbar() {
  return (
    <div className='p-4 border h-full flex items-center bg-white shadow-sm'>
        <MobileSidebar/>
        <NavbarRoutes/>
    </div>
  )
}

export default Navbar