import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { bgPrimaryColor } from '@/utils/colors'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress';


async function CourseNavbar({
    course,progressPercentage,
  }: {
    course: CourseChaptersUserProgressType;progressPercentage:number,
  }) {


  return (
    <div className={`p-4 border-b h-full flex items-center
     text-white ${bgPrimaryColor} shadow-sm`}>
      <CourseMobileSidebar
        course={course}
            progressPercentage={progressPercentage}
           

      />
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar