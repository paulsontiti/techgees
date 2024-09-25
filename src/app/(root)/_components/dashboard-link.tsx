
"use client"

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function DashboardLink() {
    const [loading,setLoading] = useState(false)
    const router = useRouter()

  return (
    <Button variant="link" size={"sm"}
    onClick={()=>{
        setLoading(true)
        router.push("/dashboard")
    }}
    className='flex items-center gap-x-2'
    >Dashboard <Loader loading={loading}/></Button>
  )
}

export default DashboardLink