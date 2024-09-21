"use client"
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnrollButton({courseId}:{courseId:string}){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    return <div className="my-4 flex items-center justify-center w-full gap-x-2">
    <Button
    onClick={()=>{
        setLoading(true)
      router.push(`/courses/${courseId}`)
    }}
    className="w-full md:w-[400px]">Enroll with a down payment of NGN 20,000</Button>
  <Loader loading={loading}/>
  </div>
  }