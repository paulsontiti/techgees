"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { bgNeutralColor } from '@/utils/colors'
import React, { useEffect, useState } from 'react'
import Rating from '../course/[courseId]/_components/rating'
import useScreenWidth from '../../../../hooks/useScreenWidth'
import { Testimonial } from './testimonials'
import { getFullNameInitials } from '@/utils/getNameInitials'
import FbIcon from '@/components/fb-icon'
import Link from 'next/link'
import WhatsAppIcon from '@/components/whatsApp-icon'
import { Skeleton } from '@/components/ui/skeleton'

function MobileTestimonialCard({testimonial}:{
    testimonial:Testimonial
  }) {
    const {screenWidth} = useScreenWidth();
const [width,setWidth] = useState<number | undefined>(undefined)

useEffect(()=>{
    if(screenWidth){
        setWidth(screenWidth)
    }
})


    const initials = getFullNameInitials(testimonial.fullName)
    if(!width) return <Skeleton className='w-[300px] h-[300px]'/>
  return (
    <div 
    style={{width:screenWidth}}
    className={`${bgNeutralColor} rounded-lg md:hidden flex flex-col justify-center
         p-8 w-full `}>
                <div className='flex items-start gap-x-4'>
                   
                <Avatar >
          <AvatarImage src={testimonial.imgUrl} alt={initials} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
                    <div>
                        <h1>{testimonial.fullName}</h1>
                       {testimonial.rating &&  <Rating rating={testimonial.rating}/>}
                    </div>
                </div>
            <div className='mt-8'>
               {testimonial.text}
            </div>
            <div className='mt-8 flex gap-x-4'>
              {testimonial.facebookLink &&  <Link href={testimonial.facebookLink} target='_blank'>
                <FbIcon/></Link>}
                {testimonial.whatsAppLink && <Link href={testimonial.whatsAppLink} target='_blank'>
                <WhatsAppIcon/>
                </Link>}
                
            </div>
            </div>
  )
}

export default MobileTestimonialCard