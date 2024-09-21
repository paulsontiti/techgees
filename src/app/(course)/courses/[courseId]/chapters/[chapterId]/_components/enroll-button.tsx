"use client"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export const CourseEnrollButton = (
    {courseId,label,chapterId}:{
        courseId:string,
        label:string,
        chapterId:string
    }
)=>{
  
    const [loading,setLoading] = useState(false)

    return <Button
    onClick={()=>{
        setLoading(true)
    }}
    size="sm"
    className="w-full md:w-auto">
        <Link href={`/payment/${courseId}/chapters/${chapterId}`}>
        {label}
        </Link>
        <Loader loading={loading}/>
    </Button>
}