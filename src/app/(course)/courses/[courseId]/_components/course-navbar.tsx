import React from 'react'
import { CourseChaptersUserProgressType } from '../../../../../../actions/getCourseChaptersUserProgress'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { auth } from '@clerk/nextjs/server'
type CourseNavbarProps = {
    course:CourseChaptersUserProgressType,
    progressPercentage:number,
    purchasePercentage:number

}

async function CourseNavbar({
    course,progressPercentage,purchasePercentage
}:CourseNavbarProps) {
  
  const {userId} = auth()

  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
          <CourseMobileSidebar
        course={course}
        progressPercentage={progressPercentage ?? 0}
        purchasePercentage={purchasePercentage}
        />
       <NavbarRoutes userId={userId ?? ""}/>
    </div>
  )
}

export default CourseNavbar