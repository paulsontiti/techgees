import Image from 'next/image'
import React, { ReactNode } from 'react'

function Account({children}:{children:ReactNode}) {
  return (
    <div className='flex w-11/12 lg:w-10/12'>
      <div className='relative w-1/2 h-[600px] hidden md:block'>
      <Image fill src="/assets/account.jpg" alt="A great guy creating his account"/>
      </div>
      <div className='w-full md:w-1/2 flex justify-center'>
        {children}
      </div>
    </div>
  )
}

export default Account