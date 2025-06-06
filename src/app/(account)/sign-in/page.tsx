
import React from 'react'
import Account from '../../(account)/components/account'
import { textPrimaryColor } from '@/utils/colors'
import SignInForm from '../components/sign-in-form'

function Page({
  searchParams:{redirectUrl}
}:{searchParams:{redirectUrl:string}}) {

  
  return (
    <div className='flex justify-center mt-10'>
    <Account>
    <div className='w-11/12 flex flex-col justify-center items-center'>
      <h1 className={`${textPrimaryColor} text-2xl font-bold text-center`}>
        Login to your account</h1>
        <p className='text-xs md:text-sm mt-2'>Welcome, please fill in the details to get started</p>
        <SignInForm redirectUrl={redirectUrl}/>
      </div>
    </Account>
    </div>
  )
}

export default Page