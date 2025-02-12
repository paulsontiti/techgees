"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Layout } from "lucide-react"
import Link from "next/link"
import Logo from "./logo"
import NotificationComponent from "./notification"
import { useEffect, useState } from "react"
import Loader from "./loader"
import { DBUser } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"
import { Skeleton } from "./ui/skeleton"

export const NavbarRoutes = () => {
    const pathname = usePathname()
    const router = useRouter()
    const isTeacherPage = pathname?.startsWith("/teacher")
    const isCoursePage = pathname?.includes("/courses")
    const isSearchPage = pathname === "/search"

    const [loading, setLoading] = useState(false)
    const [loadingUser, setLoadingUser] = useState(false)

    const [user, setUser] = useState<DBUser | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                setLoadingUser(true)
                const res = await axios.get(`/api/user`);
                setUser(res.data);
            } catch (errror: any) {
                toast.error("Error occurred while trying to fetch user details")
            } finally {
                setLoadingUser(false)
            }
        })();
    }, []);

    return <div className="flex items-center justify-between w-full
     text-white">

        <div className="hidden md:flex items-center gap-x-4 w-1/4">
            <Logo />

        </div>

        <div className="px-2 flex items-center justify-end gap-x-2 md:gap-x-4 ml-auto w-3/4">

            {/* <WelcomeMessage /> */}
            <Button
                variant="link"
                size="sm"
                onClick={() => {
                    router.push("/")
                }}
            >Home</Button>
            {loadingUser ? <Skeleton className="h-6 w-20" /> :
                <>
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
                        <>
                            {user?.role === "Admin" && <Link href="/teacher/courses" className="hidden md:flex items-center gapx-2">
                                Teacher mode
                            </Link>}
                        </>
                    )}</>
            }

            <NotificationComponent />
        </div>
    </div>
}