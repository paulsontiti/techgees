"use client"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import { Sidebar } from './sidebar'
import { useSheetStore } from '../../../../store/sheet-store'

function MobileSidebar() {
  const {isOpen,closeSheet,openSheet} = useSheetStore();
  return (
      <Sheet open={isOpen}>
        <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
          <Menu onClick={openSheet}/>
        </SheetTrigger>
        <SheetContent side="left"
          className='p-0 bg-white pt-20'
          onInteractOutside={closeSheet}
        onClick={closeSheet}
          >
          <Sidebar />
        </SheetContent>
      </Sheet>
  )
}

export default MobileSidebar