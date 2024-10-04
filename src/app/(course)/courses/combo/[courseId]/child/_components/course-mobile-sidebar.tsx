
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CourseSidebar from './course-sidebar'
import { CourseChaptersUserProgressType } from '../../../../../../../../actions/getCourseChaptersUserProgress'

type CourseMobileSidebarProps = {
    course: CourseChaptersUserProgressType,
    progressPercentage: number,
}

async function CourseMobileSidebar({
    course, progressPercentage
}: CourseMobileSidebarProps) {


    return (
        <Sheet>
            <SheetTrigger className='
        md:hidden pr-4 hover:opacity-75 transition'>
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className='
        p-0 bg-white w-72'>
                <CourseSidebar
                    progressPercentage={progressPercentage}
                    chapters={course.chapters}
                    course={course} />
            </SheetContent>
        </Sheet>
    )
}

export default CourseMobileSidebar