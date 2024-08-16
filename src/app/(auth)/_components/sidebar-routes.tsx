"use client"

import { BarChart, Compass, Layout, List } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'

const studentRoutes =[
    {
        icon:Layout,
        label:"Dashboard",
        href:"/dashboard"
    },
    {
        icon:Compass,
        label:"Browse",
        href:"/search"
    },
]

const teacherRoutes =[
  {
      icon:List,
      label:"Courses",
      href:"/teacher/courses"
  }
]

const adminRoutes =[
  {
      icon:List,
      label:"Courses",
      href:"/admin/courses"
  },
  {
      icon:BarChart,
      label:"Analytics",
      href:"/admin/analytics"
  },
]

function SidebarRoutes() {
  const pathname = usePathname()

    const routes = pathname.includes("/teacher") ? teacherRoutes : (
      pathname.includes("/admin") ? adminRoutes :studentRoutes)
  return (
    <div className='flex flex-col w-full'>
      {
        routes.map((route)=>{

            return(
                <SidebarItem
        
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
                />
            )
        })
      }
    </div>
  )
}

export default SidebarRoutes