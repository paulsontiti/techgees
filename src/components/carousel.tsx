"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import PageLoader from './page-loader'
import { useRouter } from 'next/navigation'

function Carousel(
    { imgUrls,
        autoSlide = false,
        autoSlideInterval = 3000

    }: {
        imgUrls: { url: string, redirectUrl?: string }[],
        autoSlide?: boolean,
        autoSlideInterval?: number
    }) {


     
    const [curr, setCurr] = useState(0)
    const [sliding, setSliding] = useState(autoSlide)

    const router = useRouter()

    const prev = () => {
        setCurr((curr) => (curr === 0 ? imgUrls.length - 1 : curr - 1))
    }

    const next = () => {
        setCurr((curr) => (curr === imgUrls.length - 1 ? 0 : curr + 1))
    }

    useEffect(() => {
        if (!sliding) return

        const slideInterval = setInterval(next, autoSlideInterval)

        return () => clearInterval(slideInterval)
    }, [sliding, autoSlideInterval])
    return (
        <div className='relative'   onClick={()=>{
            if(imgUrls[curr].redirectUrl){

                setSliding(false)
                router.push(imgUrls[curr].redirectUrl ?? "")
            }
        }}
            >
            <div className='overflow-hidden relative h-full'>
<PageLoader isloading={!sliding} label='redirecting....' className='text-white'/>
                <div className='h-1/2 flex transition-transform ease-out duration-500'
                    style={{ transform: `translateX(-${curr * 100}%)` }}
                  >
                    {imgUrls.map((slide, i) => (
                        <Image src={slide.url} alt={slide.url} width={1200} height={400}
                            key={i}
                            className='
                           
                            min-w-full max-w-full 
                            md:min-h-[400px]  
                            xl:max-h-[600px]' />
                        // <img src={s} alt={s} className=" object-cover" key={i} />
                    ))}
                </div>
              
                {/* <div className='absolute inset-0 flex items-center justify-between p-1 md:p-4'>
                    <button onClick={prev} className='p-1 rounded-full shadow
                     bg-white/80 text-gray-800
hover:bg-white'>
                        <ChevronLeft className='w-6 h-6 md:w-10 md:h-10' />
                    </button>
                    <button onClick={next} className='p-1 rounded-full shadow
                     bg-white/80 text-gray-800
hover:bg-white'>
                        <ChevronRight className='w-6 h-6 md:w-10 md:h-10' />
                    </button>
                </div> */}

            </div>
            <div className='absolute -bottom-10 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {
                        imgUrls.map((_, i) => (
                            <div key={i} className={
                                `transition-all w-3 h-3 bg-sky-500 rounded-full
                            ${curr === i ? "p-2" : "bg-opacity-50"}`
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