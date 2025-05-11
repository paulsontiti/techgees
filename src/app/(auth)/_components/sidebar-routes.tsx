"use client"

import { BarChart, Bug, Compass, HeartHandshake, Layout, List, MessageCircleQuestion, Network, Swords, User, Wallet } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import LogoutButton from '@/app/(account)/components/logout'
import { FaGoogleScholar } from 'react-icons/fa6'
const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    icon: Compass,
    label: "Browse for courses",
    href: "/search"
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile"
  },
  // {
  //   icon: BarChart,
  //   label: "Report card",
  //   href: "/report"
  // },
  {
    icon: Wallet,
    label: "Wallet",
    href: "/wallet"
  },
  {
    icon: Network,
    label: "Network",
    href: "/network"
  },
   {
      icon: FaGoogleScholar,
      label: "Scholarship courses",
      href: "/scholarship-courses"
    },
  // {
  //   icon: Bug,
  //   label: "Report an issue",
  //   href: "/report-issue"
  // },
  // {
  //   icon: MessageCircleQuestion,
  //   label: "Feedback",
  //   href: "/feedback"
  // },
]

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses"
  },
  {
    icon: List,
    label: "Categories",
    href: "/teacher/categories"
  },
  {
    icon: Swords,
    label: "Challenges",
    href: "/teacher/challenges"
  },
   {
      icon: FaGoogleScholar,
      label: "Scholarships",
      href: "/teacher/scholarships"
    },
]

const adminRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/admin/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/analytics"
  },
]

function SidebarRoutes() {
  const pathname = usePathname()

  const routes = pathname.includes("/teacher") ? teacherRoutes : studentRoutes
  return (
    <div className='flex flex-col gap-4 w-full'>
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
      <Separator />
      <div className='pl-6'>    <LogoutButton /></div>
    </div>
  )
}

export default SidebarRoutes