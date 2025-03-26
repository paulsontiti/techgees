"use client"

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function CreateChallengeButton() {
    const [loading,setLoading] = useState(false)
    const router = useRouter()
  return (
    <Button
    size="sm"
    onClick={()=>{
      setLoading(true)
      router.push("/teacher/challenges/create")
    }}>
      <PlusCircle className='h-4 w-4 mr-2'/>
      New challenge
      <Loader loading={loading}/>
    </Button>
  )
}

export default CreateChallengeButton