"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const CourseEnrollButton = (
    {courseId,label,chapterId}:{
        courseId:string,
        label:string,
        chapterId:string
    }
)=>{

    const router = useRouter()

    return <Button
    onClick={()=>{
        router.push(`/payment/${courseId}/chapters/${chapterId}`)
    }}
    size="sm"
    className="w-full md:w-auto">
        {label}
    </Button>
}