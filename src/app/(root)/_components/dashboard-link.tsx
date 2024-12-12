
"use client"

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { textPrimaryColor } from '@/utils/colors'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function DashboardLink() {
    const [loading,setLoading] = useState(false)
    const router = useRouter()

  return (
    <>
      <Button variant="outline" size={"sm"}
    onClick={()=>{
        setLoading(true)
        router.push("/dashboard")
    }}
    className={`${textPrimaryColor} flex md:hidden items-center gap-x-2 `}
    >Dashboard <Loader loading={loading}/></Button>

<Button variant="link" size={"sm"}
    onClick={()=>{
        setLoading(true)
        router.push("/dashboard")
    }}
    className='md:flex items-center gap-x-2 text-white hidden'
    >Dashboard <Loader loading={loading}/></Button>
    </>
  
  )
}

export default DashboardLink