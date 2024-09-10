"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ErrorBoundary from './error-boundary'

function Carousel(
    { imgUrls,
        autoSlide = false,
        autoSlideInterval = 3000

    }: {
        imgUrls: string[],
        autoSlide?: boolean,
        autoSlideInterval?: number
    }) {

    const [curr, setCurr] = useState(0)

    const prev = () => {
        setCurr((curr) => (curr === 0 ? imgUrls.length - 1 : curr - 1))
    }

    const next = () => {
        setCurr((curr) => (curr === imgUrls.length - 1 ? 0 : curr + 1))
    }

    useEffect(() => {
        if (!autoSlide) return

        const slideInterval = setInterval(next, autoSlideInterval)

        return () => clearInterval(slideInterval)
    }, [autoSlide,autoSlideInterval])
    return (
            <div className='overflow-hidden relative'>

                <div className='flex transition-transform ease-out duration-500'
                    style={{ transform: `translateX(-${curr * 100}%)` }}>
                    {imgUrls.map((s, i) => (
                        <img src={s} alt={s} className=" object-contain" key={i} />
                    ))}
                </div>
                <div className='absolute inset-0 flex items-center justify-between p-4'>
                    <button onClick={prev} className='p-1 rounded-full shadow bg-white/80 text-gray-800
             hover:bg-white'>
                        <ChevronLeft size={40} />
                    </button>
                    <button onClick={next} className='p-1 rounded-full shadow bg-white/80 text-gray-800
             hover:bg-white'>
                        <ChevronRight size={40} />
                    </button>
                </div>
                <div className='absolute bottom-8 right-0 left-0'>
                    <div className='flex items-center justify-center gap-2'>
                        {
                            imgUrls.map((_, i) => (
                                <div key={i} className={
                                    `transition-all w-4 h-4 bg-white rounded-full
                            ${curr === i ? "p-3" : "bg-opacity-50"}`
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