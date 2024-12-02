"use client"

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type SidebarItemProps = {
    icon:LucideIcon,
    label:string 
    href:string
}

function SidebarItem({icon:Icon,href,label}:SidebarItemProps) {
    const pathname = usePathname()
    const router = useRouter()

    const isActive = pathname === href 

const onClick = ()=>{
    router.push(href)
}



  return (
    <button
    onClick={onClick}
    className={cn(
        "flex items-center gap-x-2 text-[#111587] text-sm  font-[500] pl-6 transition-all",
        isActive && " bg-[#D0D5EF]" 
    )}>
        <div className='flex items-center gap-x-2 py-4'>
            <Icon
                size={22}
                className= "text-[#111587]"
                
            />
            {label}
        </div>
        <div className={cn(
            'ml-auto opacity-0 border-2 border-[#111587] h-full transition-all',
            isActive && "opacity-100")}/>
    </button>
  )
}

export default SidebarItem