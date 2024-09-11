"use client"
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
       
    </div>
}

export default Logo