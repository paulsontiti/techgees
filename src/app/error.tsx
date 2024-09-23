"use client"

import React from 'react'

function ErrorBoundary({error}:{error:Error}) {
  return (
    <div className='flex items-center justify-center w-full '>
        {error.message}
    </div>
  )
}

export default ErrorBoundary