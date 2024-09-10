
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import { Sidebar } from '../course/[courseId]/_components/sidebar'
import { getRecommendedCoursesForMobileSidebar } from '../../../../actions/getRecommendedCoursesForMobileSidebar'

async function MobileMenu() {
  const {recommendedCourses,error} = await getRecommendedCoursesForMobileSidebar()
  return (
    <Sheet>
        <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
        <Menu/>
        </SheetTrigger>
        <SheetContent side="left" 
        className='p-0 bg-white'>
            <Sidebar recommendedCourses={recommendedCourses} error={error}/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileMenu