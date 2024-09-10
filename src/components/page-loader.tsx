"use client"
import { Loader2 } from 'lucide-react'
import React from 'react'

function PageLoader({ isloading, label }: { isloading: boolean, label: string }) {
  if (!isloading) return null
  return (
      <div className='
    absolute h-full w-full bg-slate-500/20 top-0
    right-0 rounded-m flex flex-col items-center justify-center text-sky-700
    '>
        <Loader2 className='animate-spin h-6 w-6 text-sky-700 z-50' />
        {label}
      </div>
  )
}

export default PageLoader