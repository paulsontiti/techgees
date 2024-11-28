"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import {Layout } from "lucide-react"
import SearchInput from "./search-input"
import Link from "next/link"
import Logo from "./logo"
import NotificationComponent from "./notification"
import { useEffect, useState } from "react"
import Loader from "./loader"
import { DBUser } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"
import { Skeleton } from "./ui/skeleton"

export const NavbarRoutes = ({userId}:{userId:string}) => {
    const pathname = usePathname()
    const router = useRouter()
    const isTeacherPage = pathname?.startsWith("/teacher")
    const isCoursePage = pathname?.includes("/courses")
    const isSearchPage = pathname === "/search"

    const [loading, setLoading] = useState(false)
    const [loadingUser, setLoadingUser] = useState(false)

    const [user, setUser] = useState<DBUser | null>(null);

    useEffect(() => {
      (async () => {
        try {
            setLoadingUser(true)
          const res = await axios.get(`/api/user/${userId}`);
          setUser(res.data);
        } catch (errror: any) {
          toast.error("Error occurred while trying to fetch user details")
        }finally{
            setLoadingUser(false)
        }
      })();
    },[userId]);

    return <div className="flex items-center justify-around w-11/12 md:w-10/12 xl:w-9/12 text-white">
    
           <div className="hidden md:block">
           <Logo />
           </div>
        {
            isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )
        }
        <div className="px-2 flex items-center gap-x-2 md:gap-x-4 ml-auto">
            <Button
                variant="link"
                size="sm"
                onClick={() => {
                    router.push("/")
                }}
            >Home</Button>
            {loadingUser ? <Skeleton className="h-6 w-[200px]" /> :
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
               {user?.role === "Admin" &&  <Link href="/teacher/courses" className="hidden md:flex items-center gapx-2">
                    Teacher mode
                </Link>}
               </>
            )}</>
            }
            <UserButton />
            <NotificationComponent />
        </div>
    </div>
}