"use client"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import { Sidebar } from '../course/[courseId]/_components/sidebar'
import { useSheetStore } from '../../../../store/sheet-store'


function MobileMenu() {
const {isOpen,openSheet,closeSheet} = useSheetStore();
  return (
    <Sheet open={isOpen}>
        <SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
        <Menu onClick={openSheet}/>
        </SheetTrigger>
        <SheetContent side="left" onInteractOutside={closeSheet}
        onClick={closeSheet}
        className='p-0 bg-white'>
   
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileMenu