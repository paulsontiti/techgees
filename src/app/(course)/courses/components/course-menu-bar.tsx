"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CoursemenuMobileSidebar from '../combo/[courseId]/child/_components/course-menu-mobile-sidebar'
import { useSheetStore } from '../../../../../store/sheet-store'

function CourseMenuBar({
    parentId,childId
}:{
//progressPercentage:number,
    //chapters:SidebarChapter[],
    childId:string,
    parentId:string,
    //userId:string
}) {

    const {isOpen,closeSheet,openSheet} = useSheetStore();
  
  return (
    <Sheet open={isOpen}>
    <SheetTrigger className='
md:hidden pr-4 hover:opacity-75 transition'>
        <Menu onClick={openSheet}/>
    </SheetTrigger>
    <SheetContent side="left" className='
p-0 bg-white w-11/12' onClick={closeSheet} onInteractOutside={closeSheet}>
        <CoursemenuMobileSidebar
            //progressPercentage={progressPercentage}
            //chapters={chapters}
            childId={childId}
            parentId={parentId}
            
        />
    </SheetContent>
</Sheet>
  )
}

export default CourseMenuBar