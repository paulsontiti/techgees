"use client"
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'
import ErrorBoundary from '@/components/error-boundary'

function Navbar() {
  return (
    <ErrorBoundary>
      <div className='p-4 border h-full flex items-center bg-white shadow-sm'>
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </ErrorBoundary>
  )
}

export default Navbar