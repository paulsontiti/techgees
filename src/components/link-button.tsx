"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import Loader from './loader'
import { useRouter } from 'next/navigation'

function LinkButton({label,url}:{label:string,url:string}) {
    const [isRedirecting,setRedirecting] = useState(false)
    const router = useRouter()

    const onClick = ()=>{
        setRedirecting(true)
        router.push(url)
    }

  return (
    <div className='flex items-center justify-between'
        onClick={onClick}
    >
        <Button variant="ghost" size="sm">{label}</Button>
        <Loader loading={isRedirecting}/>
    </div>
  )
}

export default LinkButton