"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function Logo() {
const router = useRouter();

    return <h1 role='button'
            className='md:text-2xl xl:text-4xl text-white logo'
          onClick={()=> {
                router.push("/");
          }}
        >Global Genius</h1>
}

export default Logo