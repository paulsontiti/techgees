"use client"
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnrollButton({courseId,label}:{courseId:string,label?:string}){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    return <div className="flex items-center justify-center w-full gap-x-2">
    <Button
    onClick={()=>{
        setLoading(true)
      router.push(`/courses/${courseId}`)
    }}
    className="w-full md:w-[400px] flex items-center justify-center">
      {label ?? "Start for free"}
      <Loader loading={loading}/>
    </Button>

  </div>
  }