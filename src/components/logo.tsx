import Image from 'next/image'
import React from 'react'

function Logo() {

    return <div className='flex items-center '>
        <Image
    height={100}
    width={100}
    alt="Logo"
    src="/assets/logo.jpg"
    />
    {/* <span className='text-xs text-sky-700 font-bold'>theglobalgenius</span> */}
    </div>
}

export default Logo