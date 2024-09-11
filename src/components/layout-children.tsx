
'use client'
import React from 'react'
import useNetworkStatus from '../../hooks/network-status'

function LayoutChildren({
  children
}: { children: React.ReactNode }) {
  const { isOnline } = useNetworkStatus()

  if (!isOnline) return <div className='flex items-center justify-center'>
      <h2>Oops, you are offline!</h2>
      <p>Please check your internet connection and try again</p>
    </div>
  return (
     <div>
    
       {children}
     </div>
  )
}

export default LayoutChildren