
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CourseSidebar, { CourseSidebarProps } from './course-sidebar'
import { useSheetStore } from '../../../../../../../store/sheet-store'


function SingleCourseMenuBar({courseId,
}:{courseId:string}) {

  return (
    <Sheet>
    <SheetTrigger className='
md:hidden pr-4 hover:opacity-75 transition'>
        <Menu/>
    </SheetTrigger>
    <SheetContent side="left" className='
p-0 bg-white w-11/12'>
        <CourseSidebar
            
            courseId={courseId}
            />
    </SheetContent>
</Sheet>
  )
}

export default SingleCourseMenuBar