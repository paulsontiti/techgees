import React from 'react'

function ErrorPage({message}:{message:string}) {
  return (
    <div className='flex items-center justify-center text-sm p-4 '>
        {message}
    </div>
  )
}

export default ErrorPage