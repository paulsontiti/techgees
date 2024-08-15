"use client"

import { Compass, Layout } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'

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

function SidebarRoutes() {
    const routes = studentRoutes
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