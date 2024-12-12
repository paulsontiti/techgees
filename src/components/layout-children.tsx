
'use client'
import React from 'react'
import useNetworkStatus from '../../hooks/network-status'

function LayoutChildren({
  children
}: { children: React.ReactNode }) {
  const { isOnline } = useNetworkStatus()

  if (!isOnline) return <div className='flex flex-col gap-4 mt-20 items-center justify-center h-full p-4'>
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