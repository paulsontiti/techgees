"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { bgNeutralColor } from '@/utils/colors'
import React from 'react'
import Rating from '../course/[courseId]/_components/rating'
import { Facebook, Instagram } from 'lucide-react'
import MobileTestimonialCard from './mobile-testimonial-card'

function TestimonialCard() {


  return (
<>
<MobileTestimonialCard/>
        <div 
      
        className={`${bgNeutralColor} hidden rounded-lg md:flex flex-col justify-center p-8 md:w-[350px] lg:w-[400px]`}>
                <div className='flex items-start gap-x-4'>
                <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
                    <div>
                        <h1>Doose Deborah</h1>
                        <Rating rating={5}/>
                    </div>
                </div>
            <p className='mt-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt tenetur, quidem adipisci unde labore rerum odio placeat repudiandae maxime accusamus dicta ad enim voluptates quos architecto inventore doloribus voluptas distinctio?
            </p>
            <div className='mt-8 flex gap-x-4'>
                <Instagram/>
                <Facebook/>
                
            </div>
            </div></>
  )
}

export default TestimonialCard