import { Button } from "@/components/ui/button"

export const NavLinks = ()=>{

    return <nav >
        <Button variant="link" size="sm" className="text-white">Home</Button>
        <Button variant="link" size="sm" className="text-white">About Us</Button>
        <Button variant="link" size="sm" className="text-white">Courses</Button>
        <Button variant="link" size="sm" className="text-white">Resourses</Button>
        <Button variant="link" size="sm" className="text-white">Contact Us</Button>
        <Button variant="link" size="sm" className="text-white">Blog</Button>
    </nav>
}