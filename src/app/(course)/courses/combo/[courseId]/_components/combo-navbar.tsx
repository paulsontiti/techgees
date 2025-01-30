import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import { bgPrimaryColor } from '@/utils/colors'



function ComboCourseNavbar() {

  return (
    <div className={`p-4 border-b h-full flex items-center
       ${bgPrimaryColor} shadow-sm`}>

      <NavbarRoutes />
    </div>
  )
}

export default ComboCourseNavbar