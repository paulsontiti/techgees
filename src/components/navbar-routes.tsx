"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import SearchInput from "./search-input"
import Link from "next/link"

export const NavbarRoutes = () => {
    const pathname = usePathname()
    const router = useRouter()
    const isTeacherPage = pathname?.startsWith("/teacher")
    const isCoursePage = pathname?.includes("/courses")
    const isSearchPage = pathname === "/search"



    return <div className="w-full flex items-center justify-between">
        {
            isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )
        }
        <div className="flex gap-x-2 ml-auto">
            <Button
                variant="link"
                size="sm"
                onClick={() => {
                    router.push("/")
                }}
            >Home</Button>
            {isTeacherPage || isCoursePage ? (
                <Link href="/dashboard" className="flex items-center gapx-2">
                    <LogOut className="h-4 w-4 mr-2" />
                    Exit
                </Link>
            ) : (
                <Link href="/teacher/courses" className="flex items-center gapx-2">
                    Teacher mode
                </Link>
            )}
            <UserButton />
        </div>
    </div>
}