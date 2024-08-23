"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"

export const CourseEnrollButton = (
    {price,courseId}:{
        price:number,courseId:string
    }
)=>{
    return <Button
    size="sm"
    className="w-full md:w-auto">
        Enroll for {formatPrice(price)}
    </Button>
}