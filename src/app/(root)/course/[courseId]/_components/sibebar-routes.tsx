"use client"

import {GraduationCap, Home} from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { Separator } from '@/components/ui/separator'

const routes =[
    {
        icon:Home,
        label:"Home",
        href:"/"
    },
    {
        icon:GraduationCap,
        label:"What can you teach?",
        href:""
    },
    
]




 function SidebarRoutes({
  recommendedCourses,error
}:{
  recommendedCourses:{id:string,title:string}[],
  error:Error | null
}) {




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
      <Separator className='my-2'/>
        {error ? null  : <>
        <h2 className='text-sm ml-4 my-2 font-semibold'>Recommended courses</h2>
          {recommendedCourses.map((course)=>{

            return <SidebarItem
            key={course?.id}
            icon={GraduationCap}
            label={course?.title ?? ""}
            href={`/course/${course?.id}`}
            />
          })}
        </>}
    </div>
  )
}

export default SidebarRoutes