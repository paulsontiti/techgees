"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useSheetStore } from '../../../../../../../store/sheet-store'
import SingleCourseMobileSidebar from './single-course-mobile-sidebar'


function SingleCourseMenuBar({ courseId,onScholarship }
  : { courseId: string,onScholarship:boolean }) {

 

    const {openSheet,closeSheet,isOpen} = useSheetStore();
  return (
    <Sheet open={isOpen}>
    <SheetTrigger className='
md:hidden pr-4 hover:opacity-75 transition'>
        <Menu onClick={openSheet}/>
    </SheetTrigger>
    <SheetContent side="left" className='
p-0 bg-white w-11/12' onClick={closeSheet} onInteractOutside={closeSheet}>
        <SingleCourseMobileSidebar
            onScholarship={onScholarship}
            courseId={courseId}
            />
    </SheetContent>
</Sheet>
  )
}

export default SingleCourseMenuBar