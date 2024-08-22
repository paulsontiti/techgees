"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import Loader from "./loader"
import { useEffect, useState } from "react"
import SearchInput from "./search-input"

export const NavbarRoutes = ()=>{
    const pathname = usePathname()
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const isTeacherPage = pathname?.startsWith("/teacher")
    const isCoursePage = pathname?.includes("/courses")
    const isSearchPage = pathname === "/search"

    const onTeacherModeClick = ()=>{
        setLoading(true)
        router.push("/teacher/courses")
    }

    const onExitClick = ()=>{
        setLoading(true)
        router.push("/dashboard")
    }

    useEffect(()=>{
        setLoading(false)
    })

    return <>
    {
        isSearchPage && (
            <div className="hidden md:block">
                <SearchInput/>
            </div>
        )
    }
    <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
            <Button variant="ghost" size="sm"
            onClick={onExitClick}>
                <LogOut className="h-4 w-4 mr-2"/>
                Exit
                <Loader loading={loading}/>
            </Button>
        ) : (
            <Button 
            size="sm" variant="ghost"
            onClick={onTeacherModeClick}>
                Teacher mode
                <Loader loading={loading}/>
            </Button>
        )}
        <UserButton  afterSwitchSessionUrl="/dashboard"/>
    </div>
    </>
}