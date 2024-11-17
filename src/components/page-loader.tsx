"use client"
import { textSecondaryColor } from '@/utils/colors'
import { Loader2 } from 'lucide-react'
import React from 'react'

function PageLoader({ isloading, label,className }:
   { isloading: boolean, label: string,className?:string }) {
  if (!isloading) return null
  return (
      <div className={`
    absolute h-full w-full bg-slate-500/20 top-0
    ${textSecondaryColor}
    right-0 rounded-m flex flex-col items-center justify-center ${className}
    `}>
        <Loader2 className={`animate-spin h-6 w-6  z-50 ${className}`}/>
        <p className={className}>{label}</p>
      </div>
  )
}

export default PageLoader