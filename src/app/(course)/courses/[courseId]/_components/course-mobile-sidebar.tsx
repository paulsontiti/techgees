import { auth } from '@clerk/nextjs/server'

import { redirect } from 'next/navigation'
import React from 'react'
import { CourseChaptersUserProgressType } from '../../../../../../actions/getCourseChaptersUserProgress'
import { getCoursePurchaseByUserId } from '../../../../../../actions/getCoursePurchase'
import ErrorPage from '@/components/error'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CourseSidebar from './course-sidebar'

type CourseMobileSidebarProps = {
    course:CourseChaptersUserProgressType,
    progressPercentage:number
}

async function CourseMobileSidebar({
    course,progressPercentage
}:CourseMobileSidebarProps) {
    const { userId } = auth();
    if (!userId) return redirect("/");

    const {purchase,error} = await getCoursePurchaseByUserId(userId,course.id)
    if(error) return <ErrorPage message={error.message}/>
  return (
    <Sheet>
        <SheetTrigger className='
        md:hidden pr-4 hover:opacity-75 transition'>
            <Menu/>
        </SheetTrigger>
        <SheetContent side="left" className='
        p-0 bg-white w-72'>
            <CourseSidebar
            progressPercentage={progressPercentage}
            course={course}/>
        </SheetContent>
    </Sheet>
  )
}

export default CourseMobileSidebar