import { Button } from "@/components/ui/button"
import Link from "next/link"

export const NavLinks = ()=>{

    return <nav className="hidden lg:flex items-center gap-x-4">
        <Link href="/">Home</Link>
        <Link href="/courses">Courses</Link>
        {/* <Link href="/about-us">About Us</Link>
        <Link href="/contact-us">Contact Us</Link>
        <Link href="">Blog</Link> */}
    </nav>
}