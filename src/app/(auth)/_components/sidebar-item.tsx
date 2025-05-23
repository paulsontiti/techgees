"use client"

import ErrorBoundary from '@/components/error-boundary'
import Loader from '@/components/loader'
import { cn } from '@/lib/utils'
import { bgPrimaryColor, textSecondaryColor } from '@/utils/colors'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IconType } from 'react-icons/lib'

type SidebarItemProps = {
    icon: LucideIcon | IconType,
    label: string
    href: string
}

function SidebarItem({ icon: Icon, href, label }: SidebarItemProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const isActive =
        (pathname === "/dashboard" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`)

    const onClick = () => {
        setLoading(true)
        router.push(href)
        setLoading(false)
    }



    return (
            <button
                onClick={onClick}
                className={cn(
                    "flex items-center gap-x-2 text-slate-500 text-sm  font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                    isActive && `${textSecondaryColor} ${bgPrimaryColor} hover:bg-sky-200/20 hover:text-sky-700`
                )}>
                <div className='flex items-center gap-x-2 py-4'>
                    <Icon
                        size={22}
                        className={cn(
                            "text-slate-500",
                            isActive && `${textSecondaryColor}`
                        )}
                    />
                    {label}
                </div>
                <Loader loading={loading} />
                <div className={cn(
                    'ml-auto opacity-0 border-2 border-sky-700 h-full transition-all',
                    isActive && "opacity-100")} />
            </button>
    )
}

export default SidebarItem