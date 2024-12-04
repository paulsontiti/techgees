import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import { bgPrimaryColor } from '@/utils/colors'
import { getUserCookie } from '@/lib/get-user-cookie'



async function ComboCourseNavbar() {

  const userId = await getUserCookie();

  return (
    <div className={`p-4 border-b h-full flex items-center
       ${bgPrimaryColor} shadow-sm`}>
     
      <NavbarRoutes userId={userId ?? ""} />
    </div>
  )
}

export default ComboCourseNavbar