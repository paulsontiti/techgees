
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CourseSidebar, { SidebarChapter } from '../combo/[courseId]/child/_components/course-sidebar'
import { Course } from '@prisma/client'

function CourseMenuBar({
    parentId,course,progressPercentage,chapters,userId
}:{
progressPercentage:number,
    chapters:SidebarChapter[],
    course:Course,
    parentId:string,
    userId:string
}) {

  
  return (
    <Sheet>
    <SheetTrigger className='
md:hidden pr-4 hover:opacity-75 transition'>
        <Menu/>
    </SheetTrigger>
    <SheetContent side="left" className='
p-0 bg-white w-11/12' >
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

export default CourseMenuBar