
import React from 'react'
import Account from '../../(account)/components/account'
import { textPrimaryColor } from '@/utils/colors'
import SignInForm from '../components/sign-in-form'

function Page() {
  return (
    <div className='flex justify-center mt-10'>
    <Account>
    <div className='w-11/12 flex flex-col justify-center'>
      <h1 className={`${textPrimaryColor} text-2xl font-bold text-center`}>
        Login to your account</h1>
        <p>Welcome, please fill in the details to get started</p>
        <SignInForm/>
      </div>
    </Account>
    </div>
  )
}

export default Page