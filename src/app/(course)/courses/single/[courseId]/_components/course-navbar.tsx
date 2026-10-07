import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import { bgPrimaryColor } from '@/utils/colors'

// {
//     course,progressPercentage,
//   }: {
//     course: CourseChaptersUserProgressType;progressPercentage:number,
//   }

async function CourseNavbar() {


  return (
    <div className={`p-4 border-b h-full flex items-center
     text-white ${bgPrimaryColor} shadow-sm`}>
      {/* <CourseMobileSidebar
        course={course}
            progressPercentage={progressPercentage}
           

      /> */}
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar