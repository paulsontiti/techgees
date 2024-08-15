import Image from 'next/image'
import React from 'react'

function Logo() {

    return <div className='flex items-center '>
        <Image
    height={50}
    width={50}
    alt="Logo"
    src="/assets/logo.jpg"
    />
    <span className='text-xs text-sky-700 font-bold'>TechGees</span>
    </div>
}

export default Logo