"use client"
import { bgPrimaryColor, textPrimaryColor } from '@/utils/colors'
import {ChevronLeft, ChevronRight } from 'lucide-react'
import React, { ReactNode, useEffect, useState } from 'react'

function Carousel(
    { children,
        autoSlide = false,
        autoSlideInterval = 3000,
        bgColor = bgPrimaryColor,
        textColor = textPrimaryColor

    }: {
        children: ReactNode[],
        autoSlide?: boolean,
        autoSlideInterval?: number,
        bgColor?:string,
        textColor?:string
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
    }, [autoSlide, autoSlideInterval,next])
    return (
        <div className='relative w-full block md:hidden my-8'   
            >
            <div className='overflow-hidden relative h-full w-full mb-4'>

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
            <div className='absolute -bottom-10 right-0 left-0 '>
                <div className='flex items-center justify-center gap-4'>
                {
                    curr !== 0 && <ChevronLeft className={`w-8 h-8 ${textColor}`}
                    onClick={prev}
                    />
                }
                    {
                        children.map((_, i) => (
                            <div key={i} className={
                                `transition-all w-8 h-2 ${bgColor} rounded-full
                            ${curr === i ? "w-20" : "bg-opacity-50"}`
                            }>

                            </div>
                        ))
                    }
                {
                    curr !== children.length - 1 && <ChevronRight className={`w-8 h-8 ${textColor}`}
                    onClick={next}
                    />
                }
                </div>
            </div>
        </div>

    )
}

export default Carousel