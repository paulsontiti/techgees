"use client"
import Image from 'next/image'
import React from 'react'

function Logo({height,width}:{height?:number,width?:number}) {

    return <div>
        <Image
            height={height ?? 100}
            width={width ?? 100}
            alt="Logo"
            src="/assets/logo.jpg"
        />
       
    </div>
}

export default Logo