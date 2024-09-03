import { SignIn } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className='flex justify-center mt-10'>
        <SignIn/>
    </div>
  )
}

export default Page