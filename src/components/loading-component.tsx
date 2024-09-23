import React from 'react'
import Loader from './loader'

function LoadingComponent() {
  return (
    <div className='flex flex-col gap-4 items-center justify-center w-full mt-20'>
        <Loader loading />
        <p>loading page data......</p>
    </div>
  )
}

export default LoadingComponent