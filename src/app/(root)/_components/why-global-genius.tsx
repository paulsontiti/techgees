import React from 'react'
import WhyUsCard from './why-us-card'
import Carousel from '@/components/carousel'

const WhyUsCards  = [
  <WhyUsCard num='1' title='Self-paced' description={`
    Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
    `}/>,
      <WhyUsCard num='2' title='100% online' description={`
    Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
    `}/>,
       <WhyUsCard num='1' title='Self-paced' description={`
    Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
    `}/>,
      <WhyUsCard num='2' title='100% online' description={`
    Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
    `}/>,
       <WhyUsCard num='1' title='Self-paced' description={`
    Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
    `}/>,
      <WhyUsCard num='2' title='100% online' description={`
    Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
    `}/>
]

function WhyGlobalGenius() {
  return (
    <section className='flex flex-col items-center justify-center mt-16'>
        <h1 className={`text-2xl md:text-4xl font-bold m-4`}>Why Learn From The Global Genius</h1>
        <div className='mt-8 hidden md:flex md:flex-row gap-4 justify-center flex-wrap'>
          {
            WhyUsCards.map((card,i)=>(
              <div key={i}>
                {card}
              </div>
            ))
          }
        </div>
          <Carousel children={WhyUsCards} autoSlide={true} autoSlideInterval={10000}/>
    </section>
  )
}

export default WhyGlobalGenius