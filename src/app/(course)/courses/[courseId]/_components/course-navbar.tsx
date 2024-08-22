import { auth } from '@clerk/nextjs/server'
import { Chapter, Course, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'
import { CourseChaptersUserProgressType } from '../../../../../../actions/getCourseChaptersUserProgress'
import { getCoursePurchaseByUserId } from '../../../../../../actions/getCoursePurchase'
import ErrorPage from '@/components/error'
import CourseSidebarItem from './course-sidebar-item'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'

type CourseNavbarProps = {
    course:CourseChaptersUserProgressType,
    progressPercentage:number
}

async function CourseNavbar({
    course,progressPercentage
}:CourseNavbarProps) {
    const { userId } = auth();
    if (!userId) return redirect("/");

    const {purchase,error} = await getCoursePurchaseByUserId(userId,course.id)
    if(error) return <ErrorPage message={error.message}/>
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
          <CourseMobileSidebar
        course={course}
        progressPercentage={progressPercentage ?? 0}
        />
       <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar