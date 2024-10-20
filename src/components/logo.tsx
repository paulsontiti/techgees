"use client"
import Image from 'next/image'
import React from 'react'

function Logo() {

    return <div>
        <Image
            height={50}
            width={50}
            alt="Logo"
            src="/assets/logo.jpg"
        />
       
    </div>
}

export default Logo