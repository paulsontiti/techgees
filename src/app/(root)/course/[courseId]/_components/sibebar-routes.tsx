"use client"

import { GraduationCap, Home, Info, Layout, Mail, Rss } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'

const routes = [
  {
    icon: Home,
    label: "Home",
    href: "/"
  },
  // {
  //   icon: Info,
  //   label: "About Us",
  //   href: "/about-us"
  // },
  
  // {
  //   icon: Mail,
  //   label: "Contact Us",
  //   href: "/contact-us"
  // },
  {
    icon: GraduationCap,
    label: "Courses",
    href: "/courses"
  },
  // {
  //   icon: Rss,
  //   label: "Blog",
  //   href: ""
  // },

]




function SidebarRoutes() {

  return (
    <div className='flex flex-col w-full'>
      {
        routes.map((route) => {

          return (
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