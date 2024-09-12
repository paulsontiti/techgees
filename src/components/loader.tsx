"use client"

import { Loader2 } from 'lucide-react'
import React from 'react'
import ErrorBoundary from './error-boundary'

function Loader({ loading,className }: { loading: boolean,className?:string }) {
  return (
    <ErrorBoundary>
      <div>
        {loading && <Loader2 className={`ml-4 animate-spin ${className}`} />}
      </div>
    </ErrorBoundary>
  )
}

export default Loader