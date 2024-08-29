"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { useRouter } from "next/navigation"

export const CourseEnrollButton = (
    {price,courseId}:{
        price:number,courseId:string
    }
)=>{

    const router = useRouter()

    return <Button
    onClick={()=>{
        router.push(`/payment/${courseId}`)
    }}
    size="sm"
    className="w-full md:w-auto">
        Enroll for {formatPrice(price)}
    </Button>
}