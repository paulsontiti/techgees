"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const CourseEnrollButton = (
    {courseId,label}:{
        courseId:string,
        label:string
    }
)=>{

    const router = useRouter()

    return <Button
    onClick={()=>{
        router.push(`/payment/${courseId}`)
    }}
    size="sm"
    className="w-full md:w-auto">
        {label}
    </Button>
}