import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import { bgPrimaryColor } from '@/utils/colors'
import WeekMobileSidebar from './mobile-sibebar'
import { SidebarChapter } from '@/app/(course)/courses/combo/[courseId]/child/_components/course-sidebar'



async function CourseNavbar({
    chapter,progressPercentage}: {
    chapter: SidebarChapter,progressPercentage:number,
  }) {


  return (
    <div className={`p-4 border-b h-full flex items-center
     text-white ${bgPrimaryColor} shadow-sm`}>
      <WeekMobileSidebar
        chapter={chapter}
            progressPercentage={progressPercentage}
           

      />
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar