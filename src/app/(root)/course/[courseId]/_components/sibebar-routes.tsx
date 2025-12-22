"use client"

import { FileQuestion, GraduationCap, Home,Swords } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { FaGoogleScholar } from "react-icons/fa6";

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
  {
    icon: FaGoogleScholar,
    label: "Free-52-Weeks",
    href: "/free-52-weeks"
  },
  // {
  //   icon: Swords,
  //   label: "Challenges",
  //   href: "/challenges"
  // },
  // {
  //   icon: FileQuestion,
  //   label: "Survey",
  //   href: "/survey"
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