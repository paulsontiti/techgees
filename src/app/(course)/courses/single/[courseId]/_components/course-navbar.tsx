import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { bgPrimaryColor } from '@/utils/colors'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress';
import { Scholarship } from '@prisma/client';


async function CourseNavbar({
    course,progressPercentage,
    scholarship
  }: {
    course: CourseChaptersUserProgressType;
 scholarship: Scholarship | null,progressPercentage:number,
  }) {


  return (
    <div className={`p-4 border-b h-full flex items-center
     text-white ${bgPrimaryColor} shadow-sm`}>
      <CourseMobileSidebar
        course={course}
              scholarship={scholarship}
            progressPercentage={progressPercentage}
           

      />
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar