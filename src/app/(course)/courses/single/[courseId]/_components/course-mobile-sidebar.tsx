"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CourseSidebar from './course-sidebar'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress'
import { useSheetStore } from '../../../../../../../store/sheet-store'

type CourseMobileSidebarProps = {
    course: CourseChaptersUserProgressType,
    progressPercentage: number
    purchasePercentage: number
}

 function CourseMobileSidebar({
    course, progressPercentage, purchasePercentage
}: CourseMobileSidebarProps) {

const {isOpen,openSheet,closeSheet} = useSheetStore();
    return (
        <Sheet open={isOpen}>
            <SheetTrigger className='
        md:hidden pr-4 hover:opacity-75 transition'>
                <Menu onClick={openSheet}/>
            </SheetTrigger>
            <SheetContent side="left" className='
        p-0 bg-white w-72' onInteractOutside={closeSheet}
        onClick={closeSheet}>
                <CourseSidebar
                    progressPercentage={progressPercentage}
                    purchasePercentage={purchasePercentage}
                    course={course} />
            </SheetContent>
        </Sheet>
    )
}

export default CourseMobileSidebar