
import Link from "next/link"

export const NavLinks = ()=>{

    return <nav className="hidden lg:flex items-center gap-x-4">
        <Link href="/">Home</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/challenges">Challenges</Link>
        <Link href="/survey">Survey</Link>
        {/* <Link href="">Blog</Link> */}
    </nav>
}