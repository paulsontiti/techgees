import Image from 'next/image'
import React, { ReactNode } from 'react'

function Account({children}:{children:ReactNode}) {
  return (
    <div className='flex w-11/12 lg:w-9/12 xl:w-8/12 bg-white py-4'>
      <div className='relative w-1/2 h-[600px] hidden md:block'>
      <Image fill src="/assets/account.jpg" alt="A great guy creating his account"/>
      </div>
      <div className='w-full md:w-1/2 flex justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

export default Account