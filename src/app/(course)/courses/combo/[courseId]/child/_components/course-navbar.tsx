"use client"
import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { bgPrimaryColor } from '@/utils/colors'



function CourseNavbar({
parentId,childId
}: {parentId:string,childId:string}) {


  return (
    <div className={`p-4 border-b h-full flex items-center justify-center w-full
      text-white ${bgPrimaryColor} shadow-sm`}>
      <CourseMobileSidebar
        childId={childId}
        parentId={parentId}
        // progressPercentage={progressPercentage ?? 0}
        // chapters={chapters}
      />
      <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar