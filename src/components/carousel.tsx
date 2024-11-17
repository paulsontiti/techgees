"use client"
import { bgPrimaryColor } from '@/utils/colors'
import React, { ReactNode, useEffect, useState } from 'react'

function Carousel(
    { children,
        autoSlide = false,
        autoSlideInterval = 3000

    }: {
        children: ReactNode[],
        autoSlide?: boolean,
        autoSlideInterval?: number
    }) {


     
    const [curr, setCurr] = useState(0)

    const prev = () => {
        setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1))
    }

    const next = () => {
        setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1))
    }

    useEffect(() => {
        if (!autoSlide) return

        const slideInterval = setInterval(next, autoSlideInterval)

        return () => clearInterval(slideInterval)
    }, [autoSlide, autoSlideInterval])
    return (
        <div className='relative w-full block md:hidden'   
            >
            <div className='overflow-hidden relative h-full w-full'>

                <div className='h-1/2 flex  transition-transform ease-out duration-500 w-full'
                    style={{ transform: `translateX(-${curr * 100}%)` }}
                  >
                    {children.map((child, i) => (
                      <div key={i} className='w-full'>
                        {child}
                      </div>
                    ))}
                </div>
              
              

            </div>
            <div className='absolute -bottom-10 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {
                        children.map((_, i) => (
                            <div key={i} className={
                                `transition-all w-8 h-2 ${bgPrimaryColor} rounded-full
                            ${curr === i ? "w-16" : "bg-opacity-50"}`
                            }>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default Carousel