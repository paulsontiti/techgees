
import React from 'react'
import Account from '../components/account'
import { textPrimaryColor } from '@/utils/colors'
import ForgotPasswordForm from '../components/forgot-password-form'

function Page() {
  return (
    <div className='flex justify-center mt-10'>
    <Account>
      <div className='w-10/12 flex flex-col justify-center'>
      <h1 className={`${textPrimaryColor} text-2xl font-bold text-center`}>Change your password</h1>
        <p className='text-sm'>Welcome, please fill in the details to change your password</p>
        <ForgotPasswordForm/>
      </div>
    </Account>
    </div>
  )
}

export default Page