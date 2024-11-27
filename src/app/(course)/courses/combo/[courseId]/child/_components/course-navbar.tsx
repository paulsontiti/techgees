import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { auth } from '@clerk/nextjs/server'
import { CourseChaptersUserProgressType } from '../../../../../../../../actions/getCourseChaptersUserProgress'
import { bgPrimaryColor } from '@/utils/colors'
import { Chapter, Session, UserProgress } from '@prisma/client'

type CourseNavbarProps = {
  course: CourseChaptersUserProgressType,
  progressPercentage: number, parentId: string, chapters: (Chapter & {
    sessions: Session[],
    userProgresses: UserProgress[]

  })[]

}

async function CourseNavbar({
  course, progressPercentage, parentId,chapters
}: CourseNavbarProps) {

  const { userId } = auth()

  return (
    <div className={`p-4 border-b h-full flex items-center
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