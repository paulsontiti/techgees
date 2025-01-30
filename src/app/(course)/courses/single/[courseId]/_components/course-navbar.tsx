import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { bgPrimaryColor } from '@/utils/colors'

 function CourseNavbar({
  courseId
}: {courseId:string}) {

 

  return (
    <div className={`p-4 border-b h-full flex items-center
     text-white ${bgPrimaryColor} shadow-sm`}>
      <CourseMobileSidebar
        courseId={courseId}
      />
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar