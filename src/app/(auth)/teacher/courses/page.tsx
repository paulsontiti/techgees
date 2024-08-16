'use client'

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Page() {
  const [loading,setLoading] = useState(false)
  const router =  useRouter()
  return (
    <div className='p-6'>
      <Button
      onClick={()=>{
        setLoading(true)
        router.push("/teacher/create")
      }}>
        Create new course
        <Loader loading={loading}/>
      </Button>
    </div>
  )
}

export default Page