"use client"

import { BarChart, Bug, Compass, HeartHandshake, Layout, List, MessageCircleQuestion, Network, Wallet } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'

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
    icon: HeartHandshake,
    label: "Communities",
    href: "/communities"
  },
  {
    icon: Bug,
    label: "Report an issue",
    href: "/report-issue"
  },
  {
    icon: MessageCircleQuestion,
    label: "Feedback",
    href: "/feedback"
  },
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
  }
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