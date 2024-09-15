"use client"

import { Loader2 } from 'lucide-react'
import React from 'react'

function Loader({ loading,className }: { loading: boolean,className?:string }) {
  return (
      <div>
        {loading && <Loader2 className={`ml-4 animate-spin ${className}`} />}
      </div>
  )
}

export default Loader