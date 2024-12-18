"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CourseSidebar, { CourseSidebarProps } from './course-sidebar'
import { useSheetStore } from '../../../../../../../store/sheet-store'


function SingleCourseMenuBar({course,progressPercentage,purchasePercentage,
    hasDisLiked,hasLiked,hasRated,paidPositions
}:CourseSidebarProps) {
const {isOpen,closeSheet,openSheet} = useSheetStore();

  return (
    <Sheet open={isOpen}>
    <SheetTrigger className='
md:hidden pr-4 hover:opacity-75 transition'>
        <Menu onClick={openSheet}/>
    </SheetTrigger>
    <SheetContent side="left" className='
p-0 bg-white w-11/12' onClick={closeSheet} onInteractOutside={closeSheet}>
        <CourseSidebar
            progressPercentage={progressPercentage}
            purchasePercentage={purchasePercentage}
            course={course}
            paidPositions={paidPositions}
            hasDisLiked={hasDisLiked}
            hasLiked={hasLiked}
            hasRated={hasRated}
            />
    </SheetContent>
</Sheet>
  )
}

export default SingleCourseMenuBar