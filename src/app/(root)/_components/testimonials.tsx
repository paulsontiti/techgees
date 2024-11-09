import { bgPrimaryColor2 } from '@/utils/colors'
import React from 'react'
import TestimonialCard from './testimonial-card'

function Testimonials() {
  return (
    <section className={`${bgPrimaryColor2} w-full flex flex-col justify-center items-center p-8 mt-8`}>
        <h1 className='text-white text-2xl md:text-4xl mb-8'>Testimonials From Our Students</h1>
        <div className='flex flex-wrap gap-4 justify-center w-full'>
            <TestimonialCard/>
            <TestimonialCard/>
            <TestimonialCard/>
            <TestimonialCard/>
        </div>

    </section>
  )
}

export default Testimonials