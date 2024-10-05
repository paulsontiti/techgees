import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { auth } from '@clerk/nextjs/server'
import { CourseChaptersUserProgressType } from '../../../../../../../../actions/getCourseChaptersUserProgress'

type CourseNavbarProps = {
  course: CourseChaptersUserProgressType,
  progressPercentage: number, parentId: string

}

async function CourseNavbar({
  course, progressPercentage, parentId
}: CourseNavbarProps) {

  const { userId } = auth()

  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <CourseMobileSidebar
        course={course}
        parentId={parentId}
        progressPercentage={progressPercentage ?? 0}
      />
      <NavbarRoutes userId={userId ?? ""} />
    </div>
  )
}

export default CourseNavbar