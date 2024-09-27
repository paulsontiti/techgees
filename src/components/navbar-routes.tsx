"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import {Layout } from "lucide-react"
import SearchInput from "./search-input"
import Link from "next/link"
import Logo from "./logo"
import NotificationComponent from "./notification"
import { useState } from "react"
import Loader from "./loader"

export const NavbarRoutes = () => {
    const pathname = usePathname()
    const router = useRouter()
    const isTeacherPage = pathname?.startsWith("/teacher")
    const isCoursePage = pathname?.includes("/courses")
    const isSearchPage = pathname === "/search"

    const [loading, setLoading] = useState(false)


    return <div className="flex items-center w-full px-4 ">
        <div className="p-6 hidden md:block">
            <Logo />

        </div>
        {
            isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )
        }
        <div className="flex items-center gap-x-4 ml-auto">
            <Button
                variant="link"
                size="sm"
                onClick={() => {
                    router.push("/")
                }}
            >Home</Button>
            {isTeacherPage || isCoursePage ? (
                <Button
size="sm" variant="outline"
                    onClick={
                        () => {
                            setLoading(true)
                            router.push("/dashboard")
                        }
                    } className="flex items-center gapx-2">
                    <Layout className="h-4 w-4 mr-2" />
                    Dashboard
                    <Loader loading={loading} />
                </Button>
            ) : (
                <Link href="/teacher/courses" className="hidden md:flex items-center gapx-2">
                    Teacher mode
                </Link>
            )}
            <UserButton />
            <NotificationComponent />
        </div>
    </div>
}