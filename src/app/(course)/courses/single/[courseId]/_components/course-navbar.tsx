import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress'
import { bgPrimaryColor } from '@/utils/colors'
import { getUserCookie } from '@/lib/get-user-cookie'
import CourseMobileSidebar from './course-mobile-sidebar'
type CourseNavbarProps = {
  course: CourseChaptersUserProgressType | null,
  progressPercentage: number,
  purchasePercentage: number

}

async function CourseNavbar({
  course, progressPercentage, purchasePercentage
}: CourseNavbarProps) {

  const  userId  = await getUserCookie();

  return (
    <div className={`p-4 border-b h-full flex items-center
     text-white ${bgPrimaryColor} shadow-sm`}>
      {/* <CourseMobileSidebar
        course={course}
        progressPercentage={progressPercentage ?? 0}
        purchasePercentage={purchasePercentage}
      /> */}
      <NavbarRoutes userId={userId ?? ""} />
    </div>
  )
}

export default CourseNavbar