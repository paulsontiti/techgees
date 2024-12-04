
import React from 'react'
import Account from '../components/account'
import SignUpForm from '../components/sign-up-form'
import { textPrimaryColor } from '@/utils/colors'

function Page() {
  return (
    <div className='flex justify-center mt-10'>
    <Account>
      <div className='w-10/12 flex flex-col justify-center'>
      <h1 className={`${textPrimaryColor} text-2xl font-bold text-center`}>Create an account</h1>
        <p className='text-sm'>Welcome, please fill in the details to get started</p>
        <SignUpForm/>
      </div>
    </Account>
    </div>
  )
}

export default Page