"use client"
import React from 'react'
import MobileSidebar from './mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'
import ErrorBoundary from '@/components/error-boundary'
import Logo from '@/components/logo'

function Navbar() {
  return (
    <ErrorBoundary>
      <div className='p-4 border h-full flex items-center justify-between bg-white shadow-sm'>
      <div className="p-6">
                <Logo />

            </div>
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </ErrorBoundary>
  )
}

export default Navbar