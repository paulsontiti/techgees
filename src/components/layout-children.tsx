
'use client'
import React from 'react'
import useNetworkStatus from '../../hooks/network-status'
import ErrorBoundary from './error-boundary'

function LayoutChildren({
  children
}: { children: React.ReactNode }) {
  const { isOnline } = useNetworkStatus()

  if (!isOnline) return <ErrorBoundary>
    <div className='flex items-center justify-center'>
      <h2>Oops, you are offline!</h2>
      <p>Please check your internet connection and try again</p>
    </div>
  </ErrorBoundary>
  return (
    <ErrorBoundary >
      {children}
    </ErrorBoundary>
  )
}

export default LayoutChildren