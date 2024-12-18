import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { CourseChaptersUserProgressType } from '../../../../../../../../actions/getCourseChaptersUserProgress'
import { bgPrimaryColor } from '@/utils/colors'
import { getUserCookie } from '@/lib/get-user-cookie'
import { SidebarChapter } from './course-sidebar'

type CourseNavbarProps = {
  course: CourseChaptersUserProgressType,
  progressPercentage: number, parentId: string, chapters: SidebarChapter[]

}

async function CourseNavbar({
  course, progressPercentage, parentId,chapters
}: CourseNavbarProps) {

  const userId = await getUserCookie();

  return (
    <div className={`p-4 border-b h-full flex items-center justify-center w-full
      text-white ${bgPrimaryColor} shadow-sm`}>
      <CourseMobileSidebar
        course={course}
        parentId={parentId}
        progressPercentage={progressPercentage ?? 0}
        chapters={chapters}
      />
      <NavbarRoutes userId={userId ?? ""} />
    </div>
  )
}

export default CourseNavbar