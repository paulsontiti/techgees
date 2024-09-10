"use client"

import React from 'react'
import ErrorBoundary from './error-boundary'

function Footer() {
  return (
    <ErrorBoundary>
      <div className='mt-10'>Footer</div>
    </ErrorBoundary>
  )
}

export default Footer