import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress'
import { bgPrimaryColor } from '@/utils/colors'
import { getUserCookie } from '@/lib/get-user-cookie'
import CourseMobileSidebar from './course-mobile-sidebar'
import { getCourseProgress } from '../../../../../../../actions/getCourseProgress'
import { getPurchasePercentage } from '../../../../../../../actions/getPurchasePercentage'
import ErrorPage from '@/components/error'
import { redirect } from 'next/navigation'
type CourseNavbarProps = {
  course: CourseChaptersUserProgressType | null,
  progressPercentage: number,
  purchasePercentage: number

}

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
        userId={userId}
      />
      <NavbarRoutes userId={userId ?? ""} />
    </div>
  )
}

export default CourseNavbar