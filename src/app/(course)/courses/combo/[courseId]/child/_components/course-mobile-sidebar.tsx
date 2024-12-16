"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CourseSidebar from './course-sidebar'
import { CourseChaptersUserProgressType } from '../../../../../../../../actions/getCourseChaptersUserProgress'
import { Chapter, Session, UserProgress } from '@prisma/client'

type CourseMobileSidebarProps = {
    course: CourseChaptersUserProgressType,
    progressPercentage: number, parentId: string, chapters: (Chapter & {
        sessions: Session[],
        userProgresses: UserProgress[]
    
      })[]
}

 function CourseMobileSidebar({
    course, progressPercentage, parentId,chapters
}: CourseMobileSidebarProps) {

    return (
        <Sheet>
            <SheetTrigger className='
        md:hidden pr-4 hover:opacity-75 transition'>
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className='
        p-0 bg-white w-72'  >
                <CourseSidebar
                    progressPercentage={progressPercentage}
                    chapters={chapters}
                    course={course}
                    parentId={parentId}
                />
            </SheetContent>
        </Sheet>
    )
}

export default CourseMobileSidebar