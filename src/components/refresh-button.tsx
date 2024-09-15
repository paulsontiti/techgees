"use client"

import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function RefreshButton() {
    const router = useRouter()
  return (
    <div>
        <RefreshCcw className='w-4 h-4 cursor-pointer' onClick={()=>{
            router.refresh()
        }}/>
    </div>
  )
}

export default RefreshButton