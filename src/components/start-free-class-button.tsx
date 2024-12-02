"use client"
import { Button } from '@/components/ui/button'
import { bgPrimaryColor } from '@/utils/colors'
import { Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loader from '@/components/loader'

function StartFreeClassButton({courseId}:{
    courseId?:string
}) {
    const [loading,setLoading] = useState(false);
    const router = useRouter()

  return (
    <Button
    onClick={() => {
      setLoading(true)
      router.push(`${courseId ? "/courses/${courseId}" : "/courses/free"}`) 
    }}
    variant="secondary"
    className="mb-8 w-full  md:w-[250px] h-12 rounded-full flex 
    items-center justify-center py-2 gap-x-2 mt-10"
  >
    <span className={`w-10 h-10 flex items-center justify-center rounded-full ${bgPrimaryColor}`}>
      <Play className='text-white w-10' />
    </span>
    <span className="font-semibold text-xl">Start for free</span>
    <Loader loading={loading}/>
  </Button>
  )
}

export default StartFreeClassButton