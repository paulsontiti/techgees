"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { bgNeutralColor } from '@/utils/colors'
import React from 'react'
import Rating from '../course/[courseId]/_components/rating'
import MobileTestimonialCard from './mobile-testimonial-card'
import { Testimonial } from './testimonials'
import { getFullNameInitials } from '@/utils/getNameInitials'
import Link from 'next/link'
import FbIcon from '@/components/fb-icon'
import WhatsAppIcon from '@/components/whatsApp-icon'

function TestimonialCard({testimonial}:{
  testimonial:Testimonial
}) {

  const initials = getFullNameInitials(testimonial.fullName)

  return (
<>
<MobileTestimonialCard testimonial={testimonial}/>
{/* hidden on mobile devices */}
        <div 
      
        className={`${bgNeutralColor} hidden rounded-lg md:flex flex-col 
        
         p-8 w-full max-h-[500px]`}>
                <div className='flex items-start gap-x-4'>
                <Avatar>
          <AvatarImage src={testimonial.imgUrl} alt={initials} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
                    <div>
                        <h1>{testimonial.fullName}</h1>
                       {testimonial.rating &&  <Rating rating={testimonial.rating}/>}
                    </div>
                </div>
            <div className='mt-2 text-sm'>
               {testimonial.text}
            </div>
            <div className='mt-8 flex gap-x-4'>
            {testimonial.facebookLink &&  <Link href={testimonial.facebookLink} target='_blank'>
                <FbIcon/></Link>}
                {testimonial.whatsAppLink && <Link href={testimonial.whatsAppLink} target='_blank'>
                <WhatsAppIcon/>
                </Link>}
                
            </div>
            </div></>
  )
}

export default TestimonialCard