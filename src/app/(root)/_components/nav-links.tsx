
import Link from "next/link"

export const NavLinks = ()=>{

    return <nav className="hidden xl:flex items-center gap-x-4">
        <Link href="/">Home</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/challenges">Challenges</Link>
        <Link href="/survey">Survey</Link>
        <Link href="/scholarships">Scholarships</Link>
    </nav>
}