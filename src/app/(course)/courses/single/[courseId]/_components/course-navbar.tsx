import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import { getUserCookie } from '@/lib/get-user-cookie'
import CourseMobileSidebar from './course-mobile-sidebar'
import { redirect } from 'next/navigation'
import { bgPrimaryColor } from '@/utils/colors'

async function CourseNavbar({
  courseId
}: {courseId:string}) {

  const userId = await getUserCookie();
  if (!userId) return redirect("/");
 

  return (
    <div className={`p-4 border-b h-full flex items-center
     text-white ${bgPrimaryColor} shadow-sm`}>
      <CourseMobileSidebar
        courseId={courseId}
      />
      <NavbarRoutes userId={userId ?? ""} />
    </div>
  )
}

export default CourseNavbar