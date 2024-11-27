import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import { auth } from '@clerk/nextjs/server'
import { bgPrimaryColor } from '@/utils/colors'



async function ComboCourseNavbar() {

  const { userId } = auth()

  return (
    <div className={`p-4 border-b h-full flex items-center
       ${bgPrimaryColor} shadow-sm`}>
     
      <NavbarRoutes userId={userId ?? ""} />
    </div>
  )
}

export default ComboCourseNavbar