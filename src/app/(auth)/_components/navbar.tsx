"use client"
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'

function Navbar() {
  return (
      <div className='p-4 h-full flex items-center justify-between bg-white shadow-sm'>
   
        <MobileSidebar />
        <NavbarRoutes />
      </div>
  )
}

export default Navbar