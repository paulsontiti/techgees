import { bgPrimaryColor2, bgSecondaryColor, textSecondaryColor } from '@/utils/colors'
import React from 'react'
import TestimonialCard from './testimonial-card'
import Carousel from '@/components/carousel'


function Testimonials() {
  return (
    <section className={`${bgPrimaryColor2} w-full flex flex-col justify-center items-center py-8 mt-8`}>
        <h1 className='text-white text-2xl px-4 md:text-4xl mb-8'>Testimonials From Our Students</h1>
        <div className='hidden md:flex flex-wrap gap-4 justify-center w-full'>
        {[1,2,3,4,5].map((card)=>(
               <TestimonialCard key={card}/>
            ))}
        </div>
          <Carousel autoSlide autoSlideInterval={10000} 
          bgColor={bgSecondaryColor} textColor={textSecondaryColor}>
            {[1,2,3,4,5].map((card)=>(
               <TestimonialCard key={card}/>
            ))}
          </Carousel>
    </section>
  )
}

export default Testimonials