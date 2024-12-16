"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CourseSidebar from './course-sidebar'
import { CourseChaptersUserProgressType } from '../../../../../../../../actions/getCourseChaptersUserProgress'
import { Chapter, Session, UserProgress } from '@prisma/client'
import { useSheetStore } from '../../../../../../../../store/sheet-store'

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
   const {isOpen,closeSheet,openSheet} = useSheetStore();

    return (
        <Sheet open={isOpen}>
            <SheetTrigger className='
        md:hidden pr-4 hover:opacity-75 transition'>
                <Menu onClick={openSheet}/>
            </SheetTrigger>
            <SheetContent side="left" className='
        p-0 bg-white w-72'  onInteractOutside={closeSheet}
        onClick={closeSheet}>
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