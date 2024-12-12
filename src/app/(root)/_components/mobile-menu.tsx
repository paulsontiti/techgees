
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import { Sidebar } from '../course/[courseId]/_components/sidebar'
async function MobileMenu() {

  return (
    <Sheet>
        <SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
        <Menu/>
        </SheetTrigger>
        <SheetContent side="left" 
        className='p-0 bg-white'>
     
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileMenu